import uniqBy from 'lodash.uniqby'

import type { WalletInit } from '@web3-onboard/common'
import type { InjectedWalletOptions, CustomWindow } from './types'
import { ProviderLabel } from './types'

import standardWallets from './wallets.js'
import { remove } from './helpers.js'
import { validateWalletOptions } from './validation.js'

declare const window: CustomWindow

export { ProviderIdentityFlag, ProviderLabel } from './types'

function injected(options?: InjectedWalletOptions): WalletInit {
  if (typeof window === 'undefined') return () => null

  if (options) {
    const result = validateWalletOptions(options)

    if (result && result.error) throw result.error
  }

  return helpers => {
    const { device } = helpers
    const { custom = [], filter = {} } = options || {}
    const allWallets = [...custom, ...standardWallets]
    const deduped = uniqBy(allWallets, ({ label }) => `${label}`)

    const filteredWallets = deduped.filter(wallet => {
      const { label, platforms } = wallet
      const walletFilters = filter[label]

      const filteredWallet = walletFilters === false

      const excludedDevice =
        Array.isArray(walletFilters) &&
        (walletFilters.includes(device.type) ||
          walletFilters.includes(device.os.name))

      const invalidPlatform =
        !platforms.includes('all') &&
        !platforms.includes(device.type) &&
        !platforms.includes(device.os.name)

      const supportedWallet =
        !filteredWallet && !excludedDevice && !invalidPlatform

      return supportedWallet
    })

    let removeMetaMask = false

    const validWallets = filteredWallets.filter(
      ({ injectedNamespace, checkProviderIdentity, label }) => {
        const provider = window[injectedNamespace] as CustomWindow['ethereum']

        const walletExists = checkProviderIdentity({ provider, device })

        if (
          walletExists &&
          provider.isMetaMask &&
          label !== ProviderLabel.MetaMask &&
          label !== 'Detected Wallet'
        ) {
          removeMetaMask = true
        }

        return walletExists
      }
    )

    if (validWallets.length) {
      const moreThanOneWallet = validWallets.length > 1
      // if more than one wallet, then remove detected wallet
      return validWallets
        .filter(
          remove({
            detected: moreThanOneWallet,
            metamask: moreThanOneWallet && removeMetaMask
          })
        )
        .map(({ label, getIcon, getInterface }) => ({
          label,
          getIcon,
          getInterface
        }))
    }

    return []
  }
}

export default injected
