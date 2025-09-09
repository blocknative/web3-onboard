import type {
  ConnectOptions,
  DisconnectOptions,
  WalletState,
  ConnectedChain,
} from "@web3-onboard/core";
import { Accessor } from "solid-js";

type SetChainOptions = {
  chainId: string;
  chainNamespace?: string;
  wallet: string;
  rpcUrl?: string;
  label?: string;
  token?: string;
};

interface OnboardComposable {
  alreadyConnectedWallets: string[];
  connectWallet: (options?: ConnectOptions) => Promise<void>;
  connectedChain: Accessor<ConnectedChain | null>;
  connectedWallet: Accessor<WalletState | null>;
  connectingWallet: Accessor<boolean>;
  disconnectWallet: (wallet: DisconnectOptions) => Promise<void>;
  disconnectConnectedWallet: () => Promise<void>;
  getChain: (walletLabel: string) => ConnectedChain | null;
  lastConnectionTimestamp: Accessor<number>;
  setChain: (options: SetChainOptions) => Promise<void>;
  settingChain: Accessor<boolean>;
  wallets: Accessor<WalletState[]>;
}

export type { SetChainOptions, OnboardComposable };
