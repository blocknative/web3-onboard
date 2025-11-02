import { redirect } from "@solidjs/router";
import { useSession } from "vinxi/http";

export interface Session {
  id: number | undefined;
  wallets: string[] | undefined;
}

export const getSession = () =>
  useSession<Session>({ password: process.env.SESSION_SECRET });

export const updateSession = async (wallets: string[], id?: number) => {
  const session = await getSession();
  const { data } = await session.update(() => ({
    id: id ?? session.data.id,
    wallets
  }));
  return data as Session;
};

export const safeRedirect = (url?: string) =>
  redirect(url?.startsWith("/") && !url.startsWith("//") ? url : "/");
