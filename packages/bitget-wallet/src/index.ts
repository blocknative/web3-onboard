import type { WalletInit, EIP1193Provider } from '@web3-onboard/common'
import { LegacyEip1193Adapter, currentProvider, getIsInstall, getDownload, installWalletMessage } from '@bitget-wallet/web3-sdk'
import { CustomWindow } from './types.js'
declare const window: CustomWindow

function bitgetWallet(): WalletInit {
  if (typeof window === 'undefined') return () => null
  const sdkAdapter = new LegacyEip1193Adapter();
  const appInfo = sdkAdapter.getWalletInfo();
  const logo = sdkAdapter.getLogo()
  return () => {
    return {
      label: appInfo.name,
      getIcon: async () => logo,
      getInterface: async () => {
        let provider: EIP1193Provider
        if (getIsInstall()) {
          provider = currentProvider()
        } else {
          window.open(getDownload(), '_blank')
          throw new Error(installWalletMessage);
        }
        return { provider }
      }
    }
  }
}

export default bitgetWallet

