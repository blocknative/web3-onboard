<script>
  import { share } from 'rxjs/operators'
  import Onboard from '@bn-onboard/core'
  import injectedModule from '@bn-onboard/injected-wallets'

  import ledgerModule from '@bn-onboard/ledger'
  import walletConnectModule from '@bn-onboard/walletconnect'
  import walletLinkModule from '@bn-onboard/walletlink'
  import portisModule from '@bn-onboard/portis'
  import fortmaticModule from '@bn-onboard/fortmatic'
  import torusModule from '@bn-onboard/torus'
  import blocknativeIcon from './blocknative-icon'
  import VConsole from 'vconsole'
  import { keccak256, toUtf8Bytes } from 'ethers/lib/utils'

  if (window.innerWidth < 700) {
    new VConsole()
  }

  let transactionObject
  let signMsg
  let signTypedMsg

  const injected = injectedModule({
    wallets: [
      // include custom injected wallet modules here
    ],
    exclude: {
      // mapping of wallet label to exclusion here
    }
  })

  const walletLink = walletLinkModule()

  const walletConnect = walletConnectModule()
  const portis = portisModule({
    apiKey: 'b2b7586f-2b1e-4c30-a7fb-c2d1533b153b'
  })

  const fortmatic = fortmaticModule({
    apiKey: 'pk_test_886ADCAB855632AA'
  })

  const torus = torusModule()

  const ledger = ledgerModule()

  const onboard = Onboard({
    wallets: [
      walletConnect,
      walletLink,
      injected,
      fortmatic,
      portis,
      torus,
      ledger
    ],
    chains: [
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
    ],
    appMetadata: {
      name: 'Blocknative',
      icon: blocknativeIcon,
      description: 'Demo app for Onboard V2',
      recommendedInjectedWallets: [
        { name: 'MetaMask', url: 'https://metamask.io' },
        { name: 'Coinbase', url: 'https://wallet.coinbase.com/' }
      ]
    }
    // example customising copy
    // i18n: {
    //   en: {
    //     connect: {
    //       selectingWallet: {
    //         header: 'custom text header'
    //       }
    //     }
    //   }
    // }
  })

  // Subscribe to wallet updates
  const wallets$ = onboard.state.select('wallets').pipe(share())

  const signTransactionMessage = provider => {
    provider.request({
      method: 'eth_signTransaction',
      params: [transactionObject]
    })
  }

  const signMessage = provider => {
    provider.request({
      method: 'eth_sign',
      params: [address, keccak256(toUtf8Bytes(signMsg))]
    })
  }

  const signTypedMessage = provider => {
    const msgParams = [
      {
        type: 'string',
        name: 'Message',
        value: signTypedMsg
      },
      {
        type: 'string',
        name: 'Application',
        value: 'O2 Baby!'
      },
      {
        type: 'uint32',
        name: 'A number',
        value: '1221'
      }
    ]
    provider.request({
      method: 'eth_signTypedData',
      params: [msgParams, address]
    })
  }
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

  {#if $wallets$}
    <button on:click={() => onboard.setChain('0x1')}
      >Set Chain to Mainnet</button
    >
    <button on:click={() => onboard.setChain('0x4')}
      >Set Chain to Rinkeby</button
    >
    <button on:click={() => onboard.setChain('0x89')}>Set Chain to Matic</button
    >
  {/if}

  {#if $wallets$}
    {#each $wallets$ as { icon, label, accounts, chain, provider }}
      <div class="connected-wallet">
        <div class="flex-centered" style="width: 10rem;">
          <div style="width: 2rem; height: 2rem">{@html icon}</div>
          <span>{label}</span>
        </div>

        <div>Chain: {chain}</div>

        {#each accounts as { address, ens, balance }}
          <div
            style="margin-top: 0.25rem; margin-bottom: 0.25rem; padding: 0.25rem; border: 1px solid gray;"
          >
            <div>Address: {address}</div>
            {#if balance}
              <div>Balances:</div>
              {#each Object.entries(balance) as [token, amount]}
                <div style="margin-left: 1rem;">{token}: {amount}</div>
              {/each}
            {/if}

            {#if ens}
              <div>ENS Name: {ens?.name || ''}</div>
            {/if}
          </div>

          <div>
            <input
              id="sign-transaction-input"
              type="text"
              class="text-input"
              placeholder="Sign Transaction..."
              bind:value={transactionObject}
            />
            <button on:click={signTransactionMessage(provider)}>
              Sign Transaction
            </button>
          </div>
          <div>
            <input
              id="sign-msg-input"
              type="text"
              class="text-input"
              placeholder="Message..."
              bind:value={signMsg}
            />
            <button on:click={signMessage(provider)}> Sign Message </button>
          </div>
          <div>
            <input
              id="sign-type-msg-input"
              type="text"
              class="text-input"
              placeholder="Typed message..."
              bind:value={signTypedMsg}
            />
            <button on:click={signTypedMessage(provider)}>
              Sign Typed Message
            </button>
          </div>
        {/each}
        <button
          style="margin-top: 0.5rem;"
          on:click={() => onboard.disconnectWallet({ label })}
        >
          Disconnect Wallet
        </button>
      </div>
    {/each}
  {/if}
</main>
