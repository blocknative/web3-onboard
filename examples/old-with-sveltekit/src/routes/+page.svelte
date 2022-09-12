<script lang="ts">
  import Counter from '$lib/Counter.svelte'
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

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
  <h1>
    <span class="welcome">
      <picture>
        <source srcset="svelte-welcome.webp" type="image/webp" />
        <img src="svelte-welcome.png" alt="Welcome" />
      </picture>
    </span>

    to this Web3-Onboard Demo
  </h1>

  <div>
    <button on:click={connect}>Connect</button>
  </div>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
  }

  h1 {
    width: 100%;
  }

  .welcome {
    display: block;
    position: relative;
    width: 100%;
    height: 0;
    padding: 0 0 calc(100% * 495 / 2048) 0;
  }

  .welcome img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    display: block;
  }
</style>
