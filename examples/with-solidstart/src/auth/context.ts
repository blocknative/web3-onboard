import { createContext, type Resource } from "solid-js";
import type { AccessorWithLatest } from "@solidjs/router";
import type { Session } from "~/auth/server";
import type { Web3 } from "~/web3";

interface Context {
  session: AccessorWithLatest<Session | undefined>;
  signedIn: () => boolean;
  logout: () => Promise<never>;
  web3: Resource<Web3>;
}

export default createContext<Context>();
