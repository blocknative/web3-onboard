import { Title } from "@solidjs/meta";
import { For } from "solid-js";
import useAuth from "~/auth";

export default function Home() {
  const { session } = useAuth();
  const wallets = () => session()?.wallets ?? [];

  return (
    <main>
      <Title>Home</Title>
      <h1>Signed In!</h1>
      <section class="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <div>
          <div class="text-sm font-medium text-gray-500 mb-1">Your ID</div>
          <div class="text-sm font-mono text-gray-900 select-text">
            {session()?.id}
          </div>
        </div>
        <div>
          <div class="text-sm font-medium text-gray-500 mb-2">Your Wallets</div>
          <div class="space-y-2">
            <For each={wallets()}>
              {(wallet) => (
                <div class="text-sm font-mono text-gray-900 p-3 bg-gray-50 rounded border border-gray-200 select-text">
                  {wallet}
                </div>
              )}
            </For>
          </div>
        </div>
      </section>
    </main>
  );
}
