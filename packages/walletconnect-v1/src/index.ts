import {
  EIP1193Provider,
  WalletConnectOptions,
  WalletInit
} from '@bn-onboard/types'

type RPCMapping = { [key: number]: string }

function walletConnect(options: WalletConnectOptions): WalletInit {
  // validate options

  const { bridge, qrcodeModalOptions, apiKey } = options

  return () => {
    return {
      label: 'WalletConnect',
      getIcon: async () => (await import('./icon')).default,
      getInterface: async ({ chains }) => {
        console.log({ chains })
        const rpc = chains.reduce((acc, { rpcUrl, id }) => {
          const chainIdNum = parseInt(id, 10)
          acc[chainIdNum] = rpcUrl
          return acc
        }, {} as RPCMapping)

        const { default: WalletConnectProvider } = await import(
          '@walletconnect/ethereum-provider'
        )

        console.log({ WalletConnectProvider })

        const provider = new WalletConnectProvider({
          rpc,
          bridge,
          qrcodeModalOptions
        })

        return {
          provider
        }
      }
    }
  }
}

export default walletConnect
