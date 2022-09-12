<script lang="ts">
  import onboard from '$lib/web3-onboard'

  // Subscribe to wallet updates
  const wallets$ = onboard.state.select('wallets')

  // The first wallet in the array of connected wallets
  $: connectedAccount = $wallets$?.[0]?.accounts?.[0]

  const connect = async () => {
    await onboard.connectWallet()
  }

  const disconnect = () => {
    onboard.disconnectWallet({ label: $wallets$?.[0]?.label })
  }

  const trunc = (address: string) =>
    address ? address.slice(0, 6) + '...' + address.slice(-6) : null
</script>

<main class="main">
  <h1>Welcome to this demo of Web3-Onboard + SvelteKit!</h1>
  <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
  {#if connectedAccount}
    <div class="wallet">
      <div>
        <div>0x518a...7c9017</div>
        <div>Connected Wallet: Metamask</div>
      </div>
      <button on:click={disconnect}>Disconnect</button>
    </div>
  {:else}
    <div>
      <button on:click={connect}>Connect</button>
    </div>
  {/if}
</main>

<style>
  .main {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-items: center;
    text-align: center;
    height: 100vh;
  }
</style>
