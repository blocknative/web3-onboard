<script>
  import { share } from 'rxjs/operators'
  import Onboard from '@bn-onboard/core'
  import injected from '@bn-onboard/injected-wallets'
  import blocknativeIcon from './blocknative-icon'

  const injectedWallet = injected({
    wallets: [
      // include custom injected wallet modules here
    ],
    exclude: {
      'Detected Wallet': false
    }
  })

  const options = {
    apiKey: 'd65d5b97-f3fc-4d85-beed-29ba6709c14d',
    wallets: [injectedWallet],
    appMetadata: {
      name: 'Blocknative',
      icon: blocknativeIcon,
      description: 'Demo app for Onboard V2',
      recommendedInjectedWallets: [
        { name: 'MetaMask', url: 'https://metamask.io' },
        { name: 'Coinbase', url: 'https://wallet.coinbase.com/' }
      ]
    }
  }

  const onboard = Onboard(options)

  // Subscribe to wallet updates
  const wallets$ = onboard.state.select('wallets').pipe(share())

  // Add networks that are valid for this app
  onboard.addChains([
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl: 'https://mainnet.infura.io/v3/ababf9851fd845d0a167825f97eeb12b'
    },
    {
      id: '0x4',
      token: 'rETH',
      label: 'Ethereum Rinkeby Testnet',
      rpcUrl: 'https://rinkeby.infura.io/v3/ababf9851fd845d0a167825f97eeb12b'
    },
    {
      id: '0x89',
      token: 'MATIC',
      label: 'Matic Mainnet',
      rpcUrl: 'https://matic-mainnet.chainstacklabs.com'
    }
  ])
</script>

<style>
  .connected-wallet {
    padding: 1rem;
    border-radius: 4px;
    margin: 0.5rem;
    border: 1px solid gray;
  }

  .flex-centered {
    display: flex;
    align-items: center;
  }

  /* CUSTOMIZE CSS VARIABLES */
  :root {
    /* --onboard-gray-100: pink; */
  }
</style>

<main>
  <button on:click={() => onboard.connectWallet()}>Connect Wallet</button>
  <button on:click={() => onboard.setChain('0x1')}>Set Chain to Mainnet</button>
  <button on:click={() => onboard.setChain('0x4')}>Set Chain to Rinkeby</button>
  <button on:click={() => onboard.setChain('0x89')}>Set Chain to Matic</button>

  {#if $wallets$}
    {#each $wallets$ as { icon, label, accounts, chain }}
      <div class="connected-wallet">
        <div class="flex-centered" style="width: 10rem;">
          <div style="width: 2rem; height: 2rem">{@html icon}</div>
          <span>{label}</span>
        </div>

        <div>Chain: {chain}</div>

        {#each accounts as { address, ens, balance }}
          <div
            style="margin-top: 0.25rem; padding: 0.25rem; border: 1px solid gray;"
          >
            <div>Address: {address}</div>
            <div>ETH Balance: {balance?.eth || ''}</div>
            <div>ENS Name: {ens?.name || ''}</div>
          </div>
        {/each}

        <button
          style="margin-top: 0.5rem;"
          on:click={() => onboard.disconnectWallet({ label })}
          >Disconnect Wallet</button
        >
      </div>
    {/each}
  {/if}
</main>
