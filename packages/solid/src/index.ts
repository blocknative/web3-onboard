import { createMemo, from } from "solid-js";
import { isServer } from "solid-js/web";
import Web3Onboard, { type InitOptions } from "@web3-onboard/core";

export default function useWeb3(init: InitOptions) {
  if (isServer) return null;
  const obj = Web3Onboard(init);

  const autoReconnect = async () => {
    const storedWallets = localStorage.getItem(
      "onboard.js:last_connected_wallet"
    );
    if (storedWallets) {
      const [lastWallet] = JSON.parse(storedWallets);
      if (lastWallet === "string" && lastWallet) {
        try {
          await obj.connectWallet({
            autoSelect: { label: lastWallet, disableModals: true },
          });
        } catch {
          await obj.connectWallet();
        }
      }
    }
  };

  autoReconnect();
  const state = from(obj.state.select(), obj.state.get());
  const connectedWallet = createMemo(() => state().wallets[0]);
  const connectedChain = createMemo(() => connectedWallet()?.chains[0]);

  return {
    connectWallet: obj.connectWallet,
    connectedChain,
    connectedWallet,
    disconnectWallet: obj.disconnectWallet,
  };
}
