import { useContext } from "solid-js";
import { query, redirect, action } from "@solidjs/router";
import { getSession } from "./server";
import context from "./context";

const PROTECTED_ROUTES = ["/"];
const FALLBACK_PAGE = "/about";

export const protectedRoute = (path: string) =>
  PROTECTED_ROUTES.some((route) =>
    route.endsWith("/*")
      ? path.startsWith(route.slice(0, -2))
      : path === route || path.startsWith(route + "/")
  );

export const querySession = query(async (path: string) => {
  "use server";
  const { data: session } = await getSession();
  if (session.wallets?.length) return session;
  if (protectedRoute(path))
    throw redirect(`${FALLBACK_PAGE}?login=true&redirect=${path}`);
}, "querySession");

export const signOutAction = action(async () => {
  "use server";
  const session = await getSession();
  await session.update({ wallets: undefined });
  throw redirect(FALLBACK_PAGE, { revalidate: querySession.key });
});

export default function useAuth() {
  const ctx = useContext(context);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
