import { Suspense } from "solid-js";
import { formatBalance } from "~/web3/utils";
import useAuth from "~/auth";

export default function Balance() {
  const { web3 } = useAuth();

  return (
    <Suspense
      fallback={
        <span class="inline-block w-20 h-4 bg-gray-300/50 rounded animate-pulse" />
      }
    >
      <div class="text-sm font-medium text-gray-900">
        {formatBalance(web3()?.eth)} ETH
      </div>
    </Suspense>
  );
}
