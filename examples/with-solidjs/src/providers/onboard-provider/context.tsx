import { useOnboard } from "@web3-onboard/solid";
import { createContext, useContext } from "solid-js";
import { isServer } from "solid-js/web";
import { OnboardActions } from ".";

export const Web3Context = createContext<OnboardActions>();

/**
 * WANRING: It well throw in the server, check with isServer
 * */
export const useWeb3Onboard = () => {
  if (isServer)
    throw new Error("Context 'Web3Context' is not accessable server-side");

  const value = useContext(Web3Context);
  const context = useOnboard();

  if (!value)
    throw new Error("Context 'Web3Context' is null. Did you use <Web3Provider>?");

  return { ...value, ...context };
};
