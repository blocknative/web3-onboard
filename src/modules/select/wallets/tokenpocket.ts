import { mobileWalletInstallMessage } from '../content'
import { WalletModule, Helpers, CommonWalletOptions } from '../../../interfaces'

import tokenpocketIcon from '../wallet-icons/icon-tokenpocket.png'
import tokenpocketIcon2x from '../wallet-icons/icon-tokenpocket@2x.png'

function tokenpocket(options: CommonWalletOptions): WalletModule {
    const { preferred, label, iconSrc, svg } = options

    return {
        name: label || 'TokenPocket',
        iconSrc: iconSrc || tokenpocketIcon,
        iconSrcSet: iconSrc || tokenpocketIcon2x,
        svg,
        wallet: async (helpers: Helpers) => {
            const { getProviderName, createModernProviderInterface } = helpers

            const provider =
                (window as any).ethereum ||
                ((window as any).web3 && (window as any).web3.currentProvider)

            return {
                provider,
                interface:
                    (getProviderName(provider) === 'TokenPocket' &&
                        createModernProviderInterface(provider)) ||
                    null
            }
        },
        type: 'injected',
        link: 'https://tokenpocket.pro',
        installMessage: mobileWalletInstallMessage,
        mobile: true,
        preferred
    }
}

export default tokenpocket
