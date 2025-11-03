import { createEffect, createResource, on, type ParentProps } from "solid-js";
import {
  useLocation,
  createAsync,
  useAction,
  useSearchParams
} from "@solidjs/router";
import injectedWallets from "@web3-onboard/injected-wallets";
import { signOutAction, querySession } from "~/auth";
import { sign, authWalletAction, addWalletAction } from "~/auth/web3";
import useWeb3Onboard, { load } from "~/web3";
import Context from "./context";

export default function AuthProvider(props: ParentProps) {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const session = createAsync(() => querySession(location.pathname), {
    deferStream: true
  });

  const authWallet = useAction(authWalletAction);
  const addWallet = useAction(addWalletAction);
  const signOut = useAction(signOutAction);
  const signedIn = () => Boolean(session()?.id);

  const onboard = useWeb3Onboard({
    wallets: [injectedWallets()],
    connect: { autoConnectLastWallet: true },
    chains: [{ id: "0x1" }, { id: "0x2105" }],
    appMetadata: {
      name: "SolidStart",
      description: "Web3-onboard template",
      icon: "favicon.svg"
    }
  });

  createResource(
    () => searchParams.login === "true" && !signedIn() && onboard,
    async (onboard) => {
      try {
        const [wallet] = await onboard.connectWallet();
        if (!wallet?.provider) throw new Error("Wallet connection failed");
        const address = await sign(wallet.provider);
        const r = searchParams.redirect;
        await authWallet(address, Array.isArray(r) ? r[0] : r);
      } catch (err) {
        setSearchParams({
          error: err instanceof Error ? err.message : "",
          login: ""
        });
      }
    }
  );

  // with SSR enabled make sure to only access the web3 resource on the client
  const [web3] = createResource(onboard?.connectedWallet, load);

  createEffect(
    on(
      () => onboard?.walletAddress(),
      async (curr, prev) => {
        const saved = session()?.wallets;
        if (!saved?.length || !prev) return;
        if (!curr) await signOut();
        if (curr && curr !== prev) {
          try {
            const { provider } = onboard!.connectedWallet();
            const verified = saved.includes(curr) ? curr : await sign(provider);
            await addWallet(verified);
          } catch (err) {
            setSearchParams({ error: err instanceof Error ? err.message : "" });
          }
        }
      },
      { defer: true }
    )
  );

  const logout = async () => {
    const wallet = onboard?.connectedWallet();
    if (wallet) await onboard!.disconnectWallet({ label: wallet.label });
    return signOut();
  };

  return (
    <Context.Provider value={{ session, signedIn, logout, web3 }}>
      {props.children}
    </Context.Provider>
  );
}
