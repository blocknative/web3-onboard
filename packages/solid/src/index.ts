import {
  createSignal,
  createEffect,
  createMemo,
  batch,
  onCleanup,
} from "solid-js";
import { createStore, type SetStoreFunction, type Store } from "solid-js/store";
import { isServer } from "solid-js/web";
import type { Signal, MemoOptions } from "solid-js";
import Web3Onboard from "@web3-onboard/core";
import type {
  InitOptions,
  OnboardAPI,
  ConnectOptions,
  DisconnectOptions,
  WalletState,
  ConnectedChain,
  AppState,
} from "@web3-onboard/core";
import type { OnboardComposable, SetChainOptions } from "./types.ts";

export type * from "@web3-onboard/core";
export type * from "./types.ts";

export const STORAGE_KEYS = {
  TERMS_AGREEMENT: "onboard.js:agreement",
  LAST_CONNECTED_WALLET: "onboard.js:last_connected_wallet",
};

function createLocalStore<T extends object>(
  name: string,
  init: T
): [Store<T>, SetStoreFunction<T>] {
  let initial = init;
  if (!isServer) {
    try {
      const localState = localStorage.getItem(name);
      if (localState) {
        initial = JSON.parse(localState) as T;
      }
    } catch (e) {
      console.error(`Failed to parse localStorage for ${name}:`, e);
    }
  }

  const [state, setState] = createStore<T>(initial, { name });

  if (!isServer) {
    createEffect(() => {
      try {
        localStorage.setItem(name, JSON.stringify(state));
      } catch (e) {
        console.error(`Failed to save to localStorage for ${name}:`, e);
      }
    });
  }

  return [state, setState];
}

function createLocalStorageSignal<T>(key: string, defaultValue: T): Signal<T> {
  let initialValue: T = defaultValue;
  if (!isServer) {
    try {
      const stored = localStorage.getItem(key);
      initialValue = stored
        ? JSON.parse(stored).value ?? defaultValue
        : defaultValue;
    } catch (e) {
      console.error(`Failed to parse localStorage for ${key}:`, e);
    }
  }

  const [value, setValue] = createSignal<T>(initialValue, {
    equals: (prev, next) => prev === next,
    name: key,
  });

  if (!isServer) {
    const setValueAndStore = ((arg: Parameters<typeof setValue>[0]) => {
      return batch(() => {
        const v = setValue(arg);
        try {
          localStorage.setItem(key, JSON.stringify({ value: v }));
        } catch (e) {
          console.error(`Failed to save to localStorage for ${key}:`, e);
        }
        return v;
      });
    }) as typeof setValue;
    return [value, setValueAndStore];
  }

  return [value, setValue];
}

let web3Onboard: OnboardAPI | null = null;

const [alreadyConnectedWallets, setAlreadyConnectedWallets] = createLocalStore<
  string[]
>(STORAGE_KEYS.LAST_CONNECTED_WALLET, []);
const [lastConnectionTimestamp, setLastConnectionTimestamp] =
  createLocalStorageSignal("lastConnectionTimestamp", 0);
const [onboardState, setOnboardState] = createStore<AppState>({} as AppState, {
  name: "onboardState",
});

const updateAlreadyConnectedWallets = () => {
  batch(() => {
    setAlreadyConnectedWallets(
      onboardState.wallets.map((w: WalletState) => w.label)
    );
  });
};

const init = (options: InitOptions): OnboardAPI | null => {
  if (isServer) {
    return null;
  }

  if (!web3Onboard) {
    try {
      web3Onboard = Web3Onboard(options);
      setOnboardState(web3Onboard.state.get());

      const subscription = web3Onboard.state
        .select()
        .subscribe((update: AppState) => {
          batch(() => {
            setOnboardState(update);
            updateAlreadyConnectedWallets();
          });
        });

      onCleanup(() => {
        subscription.unsubscribe();
      });
    } catch (e) {
      console.error("Failed to initialize Web3Onboard:", e);
      web3Onboard = null;
    }
  }

  return web3Onboard;
};

const dummyOnboard: OnboardComposable = {
  alreadyConnectedWallets: [],
  connectWallet: async () => { },
  connectedChain: () => null,
  connectedWallet: () => null,
  connectingWallet: () => false,
  disconnectWallet: async () => { },
  disconnectConnectedWallet: async () => { },
  getChain: () => null,
  lastConnectionTimestamp: () => 0,
  setChain: async () => { },
  settingChain: () => false,
  wallets: () => [],
};

const useOnboard = (): OnboardComposable => {
  if (isServer || !web3Onboard) {
    return dummyOnboard;
  }

  const onboard = web3Onboard;

  const [connectingWallet, setConnectingWallet] = createSignal<boolean>(false, {
    equals: false,
    name: "connectingWallet",
  });

  const walletOptions: MemoOptions<WalletState[]> = {
    equals: (prev, next) =>
      prev.length === next.length &&
      prev.every((w, i) => w.label === next[i].label),
    name: "wallets",
  };
  const wallets = createMemo<WalletState[]>(
    () => onboardState.wallets,
    [],
    walletOptions
  );

  const connectedWalletOptions: MemoOptions<WalletState | null> = {
    equals: (prev, next) => prev?.label === next?.label,
    name: "connectedWallet",
  };
  const connectedWallet = createMemo<WalletState | null>(
    () => (wallets().length > 0 ? wallets()[0] : null),
    null,
    connectedWalletOptions
  );

  const connectedChainOptions: MemoOptions<ConnectedChain | null> = {
    equals: (prev, next) => prev?.id === next?.id,
    name: "connectedChain",
  };
  const connectedChain = createMemo<ConnectedChain | null>(
    () => (connectedWallet() && connectedWallet()!.chains[0]) || null,
    null,
    connectedChainOptions
  );

  const connectWallet = async (options?: ConnectOptions) => {
    await batch(async () => {
      setConnectingWallet(true);
      try {
        await onboard.connectWallet(options);
        setLastConnectionTimestamp(Date.now());
      } catch (e) {
        console.error("Failed to connect wallet:", e);
      } finally {
        setConnectingWallet(false);
      }
    });
  };

  const disconnectWallet = async (wallet: DisconnectOptions) => {
    await batch(async () => {
      setConnectingWallet(true);
      try {
        await onboard.disconnectWallet(wallet);
        updateAlreadyConnectedWallets();
      } catch (e) {
        console.error("Failed to disconnect wallet:", e);
      } finally {
        setConnectingWallet(false);
      }
    });
  };

  const disconnectConnectedWallet = async () => {
    const wallet = connectedWallet();
    if (wallet) {
      await disconnectWallet({ label: wallet.label });
    }
  };

  const getChain = (walletLabel: string): ConnectedChain | null => {
    const wallet = onboardState.wallets.find(
      (w: WalletState) => w.label === walletLabel
    );
    return (wallet && wallet.chains[0]) || null;
  };

  const [settingChain, setSettingChain] = createSignal<boolean>(false, {
    equals: false,
    name: "settingChain",
  });

  const setChain = async (options: SetChainOptions) => {
    await batch(async () => {
      setSettingChain(true);
      try {
        await onboard.setChain(options);
      } catch (e) {
        console.error("Failed to set chain:", e);
      } finally {
        setSettingChain(false);
      }
    });
  };

  return {
    alreadyConnectedWallets,
    connectWallet,
    connectedChain,
    connectedWallet,
    connectingWallet,
    disconnectConnectedWallet,
    disconnectWallet,
    getChain,
    lastConnectionTimestamp,
    setChain,
    settingChain,
    wallets,
  };
};

export {
  init,
  useOnboard,
  type OnboardComposable,
  type OnboardAPI,
  type InitOptions,
};
