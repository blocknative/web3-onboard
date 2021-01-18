import { mobileWalletInstallMessage } from '../content'
import { WalletModule, Helpers, CommonWalletOptions } from '../../../interfaces'

import atokenIcon from '../wallet-icons/icon-atoken.png'
import atokenIcon2x from '../wallet-icons/icon-atoken@2x.png'

function atoken(options: CommonWalletOptions): WalletModule {
    const { preferred, label, iconSrc, svg } = options

    return {
        name: label || 'AToken',
        iconSrc: iconSrc || atokenIcon,
        iconSrcSet: iconSrc || atokenIcon2x,
        svg,
        wallet: async (helpers: Helpers) => {
            const { getProviderName, createModernProviderInterface } = helpers

            const provider =
                (window as any).ethereum ||
                ((window as any).web3 && (window as any).web3.currentProvider)

            return {
                provider,
                interface:
                    (getProviderName(provider) === 'AToken' &&
                        createModernProviderInterface(provider)) ||
                    null
            }
        },
        type: 'injected',
        link: 'https://www.atoken.com',
        installMessage: mobileWalletInstallMessage,
        mobile: true,
        preferred
    }
}

export default atoken
