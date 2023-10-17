import type { WalletInit, EIP1193Provider } from '@web3-onboard/common'

let bitgetDependencies: any = null
let bitgetAdapter: any = null

const loadBitgetDependencies = async (getAdapter?: boolean) => {
  if (!bitgetDependencies) {
    bitgetDependencies = await import('@bitget-wallet/web3-sdk')
  }
  if (getAdapter && !bitgetAdapter) {
    bitgetAdapter = new bitgetDependencies.LegacyEip1193Adapter()
    return bitgetAdapter
  }
  if (getAdapter) {
    return bitgetAdapter
  }
  return bitgetDependencies
}

function bitget(): WalletInit {
  if (typeof window === 'undefined') return () => null

  return () => {
    return {
      label: 'Bitget',
      getIcon: async () => {
        const sdkAdapter = await loadBitgetDependencies(true)
        return sdkAdapter.getLogo()
      },
      getInterface: async () => {
        const {
          currentProvider,
          getIsInstall,
          getDownload,
          installWalletMessage
        } = await loadBitgetDependencies()

        let provider: EIP1193Provider
        if (getIsInstall()) {
          provider = currentProvider()
        } else {
          window.open(getDownload(), '_blank')
          throw new Error(installWalletMessage)
        }
        return { provider }
      }
    }
  }
}

export default bitget
