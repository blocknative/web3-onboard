import type { WalletInit, EIP1193Provider } from '@web3-onboard/common'

let bitgetWalletDependencies: any = null
let bitgetWalletAdapter: any = null

const loadBitgetWalletDependencies = async (getAdapter?: boolean) => {
  if (!bitgetWalletDependencies) {
    bitgetWalletDependencies = await import('@bitget-wallet/web3-sdk')
  }
  if (getAdapter && !bitgetWalletAdapter) {
    bitgetWalletAdapter = new bitgetWalletDependencies.LegacyEip1193Adapter()
    return bitgetWalletAdapter
  }
  if (getAdapter) {
    return bitgetWalletAdapter
  }
  return bitgetWalletDependencies
}

function bitgetWallet(): WalletInit {
  if (typeof window === 'undefined') return () => null

  return () => {
    return {
      label: 'Bitget Wallet',
      getIcon: async () => {
        const { WalletInfo } = await loadBitgetWalletDependencies()
        return WalletInfo.logolist.svg[256];
      },
      getInterface: async () => {
        const {
          currentProvider,
          getIsInstall,
          installWalletMessage
        } = await loadBitgetWalletDependencies()

        let provider: EIP1193Provider
        if (getIsInstall()) {
          provider = currentProvider()
        } else {
          throw new Error(installWalletMessage)
        }
        return { provider }
      }
    }
  }
}

export default bitgetWallet
