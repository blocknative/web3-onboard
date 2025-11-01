import { action } from "@solidjs/router";
import {
  BrowserProvider,
  randomBytes,
  hexlify,
  type Eip1193Provider
} from "ethers";
import { getSession, updateSession, safeRedirect } from "./server";
import { placeFirst } from "~/web3/utils";
import * as db from "~/db";

export const sign = async (provider: Eip1193Provider) => {
  try {
    const signer = await new BrowserProvider(provider).getSigner();
    const address = await signer.getAddress();
    const challenge = hexlify(randomBytes(32));
    await signer.signMessage(challenge);
    return address.toLowerCase();
  } catch {
    throw new Error("Failed to verify signature");
  }
};

export const authWalletAction = action(
  async (address: string, url?: string) => {
    "use server";
    const { data: session } = await getSession();
    let user: db.User;
    if (session.id) {
      user = await db.addNewWallet(session.id, address);
    } else {
      const existing = await db.getUserFromWallet(address);
      user = existing ? existing : await db.createUserFromWallet(address);
    }
    const ordered = placeFirst(user.wallets, address);
    await updateSession(ordered, user.id);
    return safeRedirect(url);
  }
);

export const addWalletAction = action(async (address: string) => {
  "use server";
  const { data: session } = await getSession();
  if (!session.id) throw new Error("Not logged in");
  const { wallets } = await db.addNewWallet(session.id, address);
  const ordered = placeFirst(wallets, address);
  return updateSession(ordered);
});
