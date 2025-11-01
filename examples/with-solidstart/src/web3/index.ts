import { createMemo, from } from "solid-js";
import { isServer } from "solid-js/web";
import Web3Onboard, { type InitOptions } from "@web3-onboard/core";
import {
  BrowserProvider,
  Contract,
  formatEther,
  formatUnits,
  type Eip1193Provider
} from "ethers";

// USDC ON BASE MAINNET
export const BASE_ID = "0x2105";
const USDC_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
const USDC_ABI = [
  "function approve(address spender, uint256 amount) public returns (bool)",
  "function allowance(address owner, address spender) public view returns (uint256)",
  "function balanceOf(address account) public view returns (uint256)",
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)"
];

export async function load(provider: Eip1193Provider) {
  const browserProvider = new BrowserProvider(provider);
  const signer = await browserProvider.getSigner();
  const address = await signer.getAddress();
  const usdcContract = new Contract(USDC_ADDRESS, USDC_ABI, signer);
  const usdcWei: bigint = await usdcContract.balanceOf(address);
  const usdc = formatUnits(usdcWei, 6);
  const ethWei: bigint = await browserProvider.getBalance(address);
  const eth = formatEther(ethWei);
  return { address, usdcContract, usdcWei, usdc, ethWei, eth };
}

export type Web3 = Awaited<ReturnType<typeof load>>;

export default function useWeb3Onboard(init: InitOptions) {
  if (isServer) return null;
  const { connectWallet, setChain, disconnectWallet, state } =
    Web3Onboard(init);

  const web3 = from(state.select(), state.get());
  const connectedWallet = createMemo(() => web3().wallets[0]);
  const connectedChain = createMemo(() => connectedWallet()?.chains[0]);
  const walletAddress = createMemo(
    () => connectedWallet()?.accounts[0]?.address
  );

  return {
    connectWallet,
    setChain,
    connectedChain,
    connectedWallet,
    disconnectWallet,
    walletAddress
  };
}
