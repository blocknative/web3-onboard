import { createSignal, Show } from "solid-js";
import { clientOnly } from "@solidjs/start";
import { useMatch, useSearchParams } from "@solidjs/router";
import useAuth from "~/auth";
import { shortenAddress } from "~/web3/utils";
import { Arrow, Fallback, Logout, Wallet } from "~/components/Icons";

const Balance = clientOnly(() => import("./Balance"));

export default function Nav() {
  const { session, logout } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const isHome = useMatch(() => "/");
  const isAbout = useMatch(() => "/about");
  const [show, setShow] = createSignal(false);

  return (
    <nav class="fixed top-0 left-0 w-full bg-sky-600 border-b border-sky-700 z-2">
      <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div class="flex items-center gap-1">
          <a
            href="/"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            classList={{
              "text-white bg-white/20": Boolean(isHome()),
              "text-white/80 hover:text-white hover:bg-white/10": !isHome()
            }}
          >
            Home
          </a>
          <a
            href="/about"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            classList={{
              "text-white bg-white/20": Boolean(isAbout()),
              "text-white/80 hover:text-white hover:bg-white/10": !isAbout()
            }}
          >
            About
          </a>
        </div>
        <Show
          when={session()?.wallets?.[0]}
          fallback={
            <button
              class="px-5 py-2 rounded-lg text-sm font-medium text-white bg-white/20 backdrop-blur-md hover:bg-white/30 border border-white/30 transition-colors duration-200"
              onclick={() => setSearchParams({ login: true })}
            >
              <Show when={searchParams.login}>
                <span class="loader" />
              </Show>
              Connect Wallet
            </button>
          }
          keyed
        >
          {(address) => (
            <div class="relative">
              <button
                class="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/20 backdrop-blur-md hover:bg-white/30 border border-white/30 transition-colors duration-200"
                onclick={() => setShow((prev) => !prev)}
              >
                <Wallet class="w-5 fill-white" />
                <span class="text-sm font-medium text-white">
                  {shortenAddress(address)}
                </span>
                <Arrow
                  class={`w-4 h-4 fill-white/80 transition-transform duration-200 ${show() ? "rotate-180" : ""}`}
                />
              </button>
              <div
                class="absolute right-0 mt-2 w-48 rounded-lg bg-white/90 backdrop-blur-md shadow-lg border border-white/50 overflow-hidden transition-all duration-200"
                classList={{
                  "opacity-100 visible": show(),
                  "opacity-0 invisible pointer-events-none": !show()
                }}
              >
                <div class="px-4 py-3 border-b border-gray-200/50">
                  <div class="text-xs text-gray-600 mb-1">Balance</div>
                  <Balance fallback={<Fallback class="w-24 h-4" />} />
                </div>
                <button
                  class="flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50/80 transition-colors duration-200"
                  onclick={logout}
                >
                  <span>Disconnect</span>
                  <Logout class="w-4 fill-red-600" />
                </button>
              </div>
            </div>
          )}
        </Show>
      </div>
    </nav>
  );
}
