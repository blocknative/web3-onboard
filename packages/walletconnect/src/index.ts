import {
  EIP1193Provider,
  WalletConnectOptions,
  WalletInit
} from '@bn-onboard/types'

type RPCMapping = { [key: number]: string }

function walletConnect(options: WalletConnectOptions): WalletInit {
  // validate options

  const { bridge, qrcodeModalOptions, apiKey } = options || {}

  return () => {
    return {
      label: 'WalletConnect',
      getIcon: async () => (await import('./icon')).default,
      getInterface: async ({ chains, appMetadata }) => {
        const rpc = chains.reduce((acc, { rpcUrl, id }) => {
          const chainIdNum = parseInt(id, 10)
          acc[chainIdNum] = rpcUrl
          return acc
        }, {} as RPCMapping)

        const { default: WalletConnectClient } = await import(
          '@walletconnect/client'
        )

        const client = await WalletConnectClient.init({
          relayProvider: 'wss://relay.walletconnect.com',
          apiKey: '38a58a52e0394399a6cca6296db9ee2b',
          metadata: {
            name: 'Example Dapp',
            description: 'Example Dapp',
            url: '#',
            icons: ['https://walletconnect.com/walletconnect-logo.png']
          }
        })

        console.log({ client })

        return {
          // @ts-ignore
          provider
        }
      }
    }
  }
}

export default walletConnect
