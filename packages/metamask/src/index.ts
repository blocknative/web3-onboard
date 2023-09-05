import { MetaMaskSDKOptions, EventType } from '@metamask/sdk'
import { EIP1193Provider, WalletInit } from '@web3-onboard/common'

function metamaskWallet({
  options
}: {
  options: MetaMaskSDKOptions
}): WalletInit {
  return (helpers) => {
    return {
      label: 'MetaMask Wallet',
      getIcon: async () => (await import('./icon.js')).default,
      getInterface: async ({ chains, appMetadata }) => {
        const [chain] = chains
        const { name, icon } = appMetadata || {}
        const { Subject, fromEvent } = await import('rxjs')
        const { takeUntil, take } = await import('rxjs/operators')

        console.log(`getInterface`, helpers, options, chain, name, icon)
        // according to https://github.com/wagmi-dev/wagmi/issues/383
        // @coinbase/wallet-sdk export double default fields
        // so we need to detect it to get the real constructor
        const { MetaMaskSDK } = await import(
          '@metamask/sdk'
        )

        const base64 = window.btoa(icon || '')
        const appLogoUrl = `data:image/svg+xml;base64,${base64}`

        const instance = new MetaMaskSDK({
          communicationServerUrl: 'http://192.168.50.114:4000',
          dappMetadata: {
            name: name || '',
            base64Icon: appLogoUrl
          },
          _source: 'web3-onboard'
        })

        await instance.init()

        fromEvent(instance.getProvider(), 'disconnect', (error, payload) => {
          console.warn(`MetaMask Wallet disconnected`)
          if (error) {
            throw error
          }
          return payload
        })
          // .pipe(takeUntil(this.disconnected$))
          // .subscribe({
          //   next: () => {
          //     this.emit(‘accountsChanged’, [])
          //     this.disconnected$.next(true)
          //     typeof localStorage !== ‘undefined’ &&
          //       localStorage.removeItem(‘walletconnect’)
          //   },
          //   error: console.warn
          // })

        instance.getProvider().on('disconnect', () => {
          console.log(`MetaMask Wallet disconnected`)
        })
        instance.getProvider().on('disconnected', () => {
          console.log(`MetaMask Wallet disconnected`)
        })
        instance.on(EventType.PROVIDER_UPDATE, (status) => {
          console.debug(`MetaMask Wallet provider updated`, status)
        })
        instance.on('disconnect', () => {
          console.warn(`MetaMask Wallet disconnected`)
        })

        return {
          provider: instance.getProvider() as unknown as EIP1193Provider,
          instance
        }
      }
    }
  }
}

export default metamaskWallet
