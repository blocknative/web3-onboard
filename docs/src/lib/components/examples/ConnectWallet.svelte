<script lang="ts">
  import { Chip } from '@svelteness/kit-docs'

  import Onboard from '@web3-onboard/core'
  import injectedModule from '@web3-onboard/injected-wallets'

  const INFURA_ID = 'e0b15c21b7d54cd4814586334af72618'

  const injected = injectedModule()

  const onboard = Onboard({
    wallets: [injected],
    chains: [
      {
        id: '0x1',
        token: 'ETH',
        label: 'Ethereum Mainnet',
        rpcUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`
      },
      {
        id: '0x3',
        token: 'tROP',
        label: 'Ethereum Ropsten Testnet',
        rpcUrl: `https://ropsten.infura.io/v3/${INFURA_ID}`
      }
    ],
    appMetadata: {
      name: 'Documentation',
      icon: '<svg></svg>',
      description: 'Example showcasing how to connect a wallet.',
      recommendedInjectedWallets: [
        { name: 'MetaMask', url: 'https://metamask.io' },
        { name: 'Coinbase', url: 'https://wallet.coinbase.com/' }
      ]
    },
    accountCenter: { desktop: { enabled: false }, mobile: { enabled: false } }
  })

  const trunc = (address: string) =>
    address ? address.slice(0, 6) + '...' + address.slice(-6) : null

  let connecting = false

  // Subscribe to wallet updates
  const wallets$ = onboard.state.select('wallets')

  // The first wallet in the array of connected wallets
  $: connectedAccount = $wallets$?.[0]?.accounts?.[0]

  async function connectWallet() {
    if ($wallets$?.[0]?.provider) {
      onboard.disconnectWallet({ label: $wallets$?.[0]?.label })
    } else {
      connecting = true
      await onboard.connectWallet()
      connecting = false
    }
  }

  $: buttonText = $wallets$?.[0]?.provider ? 'Disconnect' : connecting ? 'Connecting' : 'Connect'

  $: account = connectedAccount?.ens?.name
    ? {
        ens: connectedAccount?.ens,
        address: trunc(connectedAccount?.address)
      }
    : { address: trunc(connectedAccount?.address) }
</script>

<div class="flex items-center justify-center border-gray-divider border rounded-md h-40 p-4">
  {#if $wallets$?.[0]?.provider}
    <div
      class="flex items-center w-full px-3 py-2 border border-gray-divider bg-gray-elevate text-gray-inverse rounded-md"
    >
      <div class="w-9 h-9 rounded-full overflow-hidden mr-2">
        {#if account?.ens?.avatar?.url}
          <img src={account?.ens?.avatar?.url} alt="" />
        {:else}
          <div class="bg-gradient-to-r from-cyan-500 to-blue-500 w-full h-full" />
        {/if}
      </div>
      <div>
        <div class="">
          {account?.ens ? `${account?.ens?.name} (${account?.address})` : `${account?.address}`}
        </div>
        <div class=" text-sm">Connected to <Chip>{$wallets$?.[0]?.label}</Chip></div>
      </div>

      <button
        class="ml-auto rounded-lg bg-gray-inverse hover:bg-gray-hover hover:text-gray-inverse transition-all px-4 h-10 text-base text-gray-current"
        on:click={connectWallet}
      >
        {buttonText}
      </button>
    </div>
  {:else}
    <button
      class=" rounded-lg bg-gray-inverse hover:bg-gray-hover hover:text-gray-inverse transition-all px-4 h-10 text-base text-gray-current"
      on:click={connectWallet}
    >
      {buttonText}
    </button>
  {/if}
</div>
