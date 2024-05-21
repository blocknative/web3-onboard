import type { init } from "@web3-onboard/solid";
import injectedModule from "@web3-onboard/injected-wallets";

const injected = injectedModule();

const MAINNET_RPC_URL = 'https://mainnet.infura.io/v3/<INFURA_KEY>'
export const chains = [
  {
    id: '0x1',
    token: 'ETH',
    label: 'Ethereum Mainnet',
    rpcUrl: MAINNET_RPC_URL
  },
  {
    id: 42161,
    token: 'ARB-ETH',
    label: 'Arbitrum One',
    rpcUrl: 'https://rpc.ankr.com/arbitrum'
  },
  {
    id: '0xa4ba',
    token: 'ARB',
    label: 'Arbitrum Nova',
    rpcUrl: 'https://nova.arbitrum.io/rpc'
  },
  {
    id: '0x2105',
    token: 'ETH',
    label: 'Base',
    rpcUrl: 'https://mainnet.base.org'
  },
  {
    id: '0xa4ec',
    token: 'ETH',
    label: 'Celo',
    rpcUrl: 'https://1rpc.io/celo'
  },
  {
    id: 666666666,
    token: 'DEGEN',
    label: 'Degen',
    rpcUrl: 'https://rpc.degen.tips'
  }
];

export default {
  accountCenter: {
    desktop: {
      enabled: true,
    },
    mobile: {
      enabled: true,
    },
  },
  wallets: [injected],
  connect: { autoConnectLastWallet: true },
  chains,
  appMetadata: {
    name: "Takaturn",
    icon: "<svg><svg/>",
    description: "Taka's web3-onboard",
    recommendedInjectedWallets: [
      { name: "MetaMask", url: "https://metamask.io" },
      { name: "Coinbase", url: "https://wallet.coinbase.com/" },
      { name: "Frame", url: "https://frame.sh" },
    ],
  },
} satisfies Parameters<typeof init>["0"];
