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
import useWeb3Onboard, { BASE_ID, load } from "~/web3";
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
    chains: [{ id: BASE_ID }],
    appMetadata: {
      name: "SolidStart",
      description: "SolidStart web3-onboard template",
      icon: "favicon.svg"
    }
  });

  createResource(
    () => searchParams.login === "true" && !signedIn() && onboard,
    async (instance) => {
      try {
        const [wallet] = await instance.connectWallet();
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

  const [web3] = createResource(
    onboard?.connectedWallet,
    async ({ provider }) => {
      if (onboard!.connectedChain().id !== BASE_ID)
        await onboard!.setChain({ chainId: BASE_ID });
      return load(provider);
    }
  );

  createEffect(
    on(
      () => onboard?.walletAddress(),
      async (current, previous) => {
        const saved = session()?.wallets;
        if (!saved?.length || !previous) return;
        if (!current) await signOut();
        if (current && current !== previous) {
          try {
            const { provider } = onboard!.connectedWallet();
            const addr = current.toLowerCase();
            const verified = saved.includes(addr) ? addr : await sign(provider);
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
    try {
      const wallet = onboard?.connectedWallet();
      if (wallet) {
        await onboard!.disconnectWallet({ label: wallet.label });
      }
    } finally {
      await signOut();
    }
  };
  };

   return (

  return (
    <Context.Provider value={{ session, signedIn, logout, web3 }}>
      {props.children}
    </Context.Provider>
  );
}
