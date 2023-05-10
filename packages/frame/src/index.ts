import { WalletInit } from '@web3-onboard/common'

async function getProvider() {
  const injected = (window as any).ethereum

  if (injected && injected.isFrame) {
    return injected
  }

  const { default: ethProvider } = await import('eth-provider')
  return ethProvider('frame')
}

function frame(): WalletInit {
  return () => {
    return {
      label: 'Frame',
      getIcon: async () => (await import('./icon.js')).default,
      getInterface: async () => {
        const provider = await getProvider()

        if (!provider.isFrame && !provider.connected) {
          throw new Error(
            'Frame App must be open with a hot wallet connected. If not installed first download the Frame wallet'
          )
        }
        return {
          provider,
          interface: {
            connect: () =>
              provider
                .request({
                  method: 'eth_requestAccounts'
                })
                .catch((err: { message: string }) => {
                  if (err.message.includes('Unexpected end of JSON input')) {
                    throw new Error('Frame is not running')
                  }

                  throw err
                }),
            disconnect: provider.close
          }
        }
      },
      platforms: ['desktop']
    }
  }
}

export default frame