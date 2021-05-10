import { Helpers, SdkWalletOptions, WalletModule } from '../../../interfaces'
const svg = ``

export default function keepkey(
  options: SdkWalletOptions & { networkId: number }
): WalletModule {
  const { networkId, preferred, label, iconSrc, svg } = options
  return {
    name: label || 'KeepKey',
    wallet: async () => {
      const { WebUSBKeepKeyAdapter } = await import(
        '@shapeshiftoss/hdwallet-keepkey-webusb'
      )

      const { Keyring } = await import('@shapeshiftoss/hdwallet-core')
      const keyring = new Keyring()

      const keepkeyAdapter = WebUSBKeepKeyAdapter.useKeyring(keyring)

      const keepKeyWallet = await keepkeyAdapter.pairDevice(
        undefined,
        /*tryDebugLink=*/ true
      )

      console.log({ keepKeyWallet })

      return { provider: undefined, interface: null }
    },
    svg,
    type: 'hardware',
    link: '',
    mobile: false,
    desktop: true
  }
}
