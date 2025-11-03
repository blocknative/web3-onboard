import { Suspense } from "solid-js";
import { formatBalance } from "~/web3/utils";
import useAuth from "~/auth";
import { Fallback } from "~/components/Icons";

export default function Balance() {
  const { web3 } = useAuth();

  return (
    <Suspense fallback={<Fallback class="w-24 h-4" />}>
      <div class="text-sm font-medium text-gray-900">
        {formatBalance(web3()?.eth)} ETH
      </div>
    </Suspense>
  );
}
