import type { WalletInit } from '@web3-onboard/common'

interface SequenceOptions {
  appName?: string,
  network?: number | string
}

function sequence(options?: SequenceOptions): WalletInit {
  const { appName = 'app', network = 137 } = options || {}

  return () => {
    // @ts-ignore
    return window?.ethereum && window.ethereum?.isSequence ?
      []
    :
     {
      label: 'Sequence',
      getIcon: async () => (await import('./icon.js')).default,
      getInterface: async () => {
        const { sequence } = await import('0xsequence')
        const { createEIP1193Provider } = await import('@web3-onboard/common')

        const instance = new sequence.Wallet(network);

        if (!instance.isConnected()) {
          const connectDetails = await instance.connect({
            app: appName,
            authorize: true
          });

          if (!connectDetails.connected) {
            throw new Error('Failed to connect to the wallet')
          }
        }

        // The check for connection is necessary in case the user closes the popup or cancels
        if (instance.isConnected()) {
          const sequenceProvider = instance.getProvider();
          const provider = createEIP1193Provider(sequenceProvider, {
            eth_requestAccounts: async () => {
              const address = await instance.getAddress()
              return [address]
            },
            eth_chainId: async () => {
              const chainId = await instance.getChainId()
              
              return `0x${chainId.toString(16)}`
            }
          })

          return {
            provider,
            instance
          }
        }

        throw new Error('Failed to connect wallet')
      }
    }
  }
}

export default sequence
