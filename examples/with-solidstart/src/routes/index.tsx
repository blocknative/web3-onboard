import { For, Suspense } from "solid-js";
import { Title } from "@solidjs/meta";
import { clientOnly } from "@solidjs/start";
import useAuth from "~/auth";
import { Fallback } from "~/components/Icons";

export default clientOnly(async () => ({ default: Home }));

function Home() {
  const { session, web3 } = useAuth();

  const getChainName = () => {
    switch (web3()?.chain.id) {
      case "0x1":
        return "Ethereum Mainnet";
      case "0x2105":
        return "Base Mainnet";
      default:
        return "Unknown";
    }
  };

  return (
    <>
      <Title>Home Page</Title>
      <h1>Signed In!</h1>
      <section class="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <div>
          <div class="text-sm font-medium text-gray-500 mb-1">
            ID in Database
          </div>
          <div class="text-sm font-mono text-gray-900 select-text">
            {session()?.id}
          </div>
        </div>
        <div>
          <div class="text-sm font-medium text-gray-500 mb-1">
            Connected Chain
          </div>
          <div class="text-sm font-mono text-gray-900 select-text">
            <Suspense fallback={<Fallback class="w-36 h-4" />}>
              {getChainName()} - {web3()?.chain.id}
            </Suspense>
          </div>
        </div>
        <div>
          <div class="text-sm font-medium text-gray-500 mb-2">
            Verified Wallets
          </div>
          <div class="space-y-2">
            <For each={session()?.wallets}>
              {(address) => (
                <div class="text-sm font-mono text-gray-900 p-3 bg-gray-50 rounded border border-gray-200 select-text">
                  {address}
                </div>
              )}
            </For>
          </div>
        </div>
      </section>
    </>
  );
}
