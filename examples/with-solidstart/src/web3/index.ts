import { createMemo, from } from "solid-js";
import { isServer } from "solid-js/web";
import Web3Onboard, {
  type WalletState,
  type InitOptions
} from "@web3-onboard/core";
import { BrowserProvider, formatEther } from "ethers";

export async function load({ chains, provider }: WalletState) {
  const [chain] = chains;
  const browserProvider = new BrowserProvider(provider);
  const signer = await browserProvider.getSigner();
  const address = await signer.getAddress();
  const ethWei: bigint = await browserProvider.getBalance(address);
  const eth = formatEther(ethWei);
  return { address, chain, ethWei, eth };
}

export type Web3 = Awaited<ReturnType<typeof load>>;

export default function useWeb3Onboard(init: InitOptions) {
  if (isServer) return null;
  const { connectWallet, setChain, disconnectWallet, state } =
    Web3Onboard(init);

  const web3 = from(state.select(), state.get());
  const connectedWallet = createMemo(() => web3().wallets[0]);
  const connectedChain = createMemo(() => connectedWallet()?.chains[0]);
  const walletAddress = createMemo(() =>
    connectedWallet()?.accounts[0].address.toLowerCase()
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
