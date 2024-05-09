import { init, useOnboard } from "@web3-onboard/solid";
import { createSignal, type Accessor, type FlowProps, createMemo, createEffect } from "solid-js";
import { isServer } from "solid-js/web";
import { Web3Context } from "./context";
import options from "./options";

export interface OnboardActions {
  isWrongNetwork(): boolean | undefined
  isWalletConnected(): boolean
  walletAddress: Accessor<string | undefined>
  chainID: Accessor<string | undefined>
  forceTrigger(): void
  connectUserWallet(): void
}

const initializeOnboardWallet = (): OnboardActions => {
  init(options);
  console.log("onboard: initialize");

  const [chainID, setChainID] = createSignal<string>();
  const [walletAddress, setWalletAddress] = createSignal<string>();
  const isWalletConnected = createMemo(() => {
    const onboard = useOnboard();
    const connectedWallet = onboard.connectedWallet();
    return connectedWallet ? connectedWallet.accounts.length > 0 : false;
  });

  const [trigger, forceTrigger] = createSignal<any>();

  const isWrongNetwork = createMemo(() => {
    const id = chainID();
    if (!id)
      return;
    return id !== options.chains[0].id;
  });

  // set wallet address on wallet state change
  createEffect(async () => {
    const onboard = useOnboard();
    const connectedWallet = onboard.connectedWallet();
    if (!connectedWallet || connectedWallet.accounts.length === 0)
      return;

    console.log("onboard: set wallet address");
    const address = connectedWallet.accounts[0].address;

    setWalletAddress(address);
  });

  // Check and set chain id on chain state change
  createEffect(async () => {
    trigger();
    const onboard = useOnboard();
    const connectedChain = onboard.connectedChain();
    if (!connectedChain || !connectedChain.id)
      return;

    console.log("onboard: set chain");
    setChainID(connectedChain.id);
  });

  const connectUserWallet = async () => {
    const onboard = useOnboard();
    await onboard.connectWallet();

    const connectedWallet = onboard!.connectedWallet();
    if (!connectedWallet || connectedWallet.accounts.length === 0) {
      return;
    }

  };


  return { isWrongNetwork, isWalletConnected, walletAddress, chainID, forceTrigger, connectUserWallet };
};

let actions: OnboardActions | undefined;

export default (props: FlowProps) => {
  if (!actions && !isServer)
    actions = initializeOnboardWallet();

  return <Web3Context.Provider value={actions} children={props.children} />;
};
