import type { WalletInit, EIP1193Provider } from '@web3-onboard/common'
import { LegacyEip1193Adapter, currentProvider, getter, config } from '@bitget-wallet/web3-sdk'
import { CustomWindow } from './types.js'
declare const window: CustomWindow

function bitget(): WalletInit {
  if (typeof window === 'undefined') return () => null
  const sdkAdapter = new LegacyEip1193Adapter();
  const appInfo = sdkAdapter.getWalletInfo();
  const logo = sdkAdapter.getLogo()
  return () => {
    return {
      label: appInfo.name,
      getIcon:
        async () => logo,
      getInterface: async () => {
        let provider: EIP1193Provider
        if (getter.getIsinstallBitget()) {
          provider = currentProvider()
        } else {
          window.open(getter.getBitgetDownload(), '_blank')
          throw new Error(config.installWalletMessage);
        }
        return { provider }
      }
    }
  }
}

export default bitget

