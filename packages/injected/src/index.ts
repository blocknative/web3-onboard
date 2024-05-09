import uniqBy from 'lodash.uniqby'
import { createEIP1193Provider, type WalletInit } from '@web3-onboard/common'
import { ProviderLabel } from './types.js'
import standardWallets from './wallets.js'
import {
  validateEIP6963ProviderDetail,
  validateWalletOptions
} from './validation.js'
import {
  containsExecutableJavaScript,
  defaultWalletUnavailableMsg,
  isWalletAvailable
} from './helpers.js'

import type {
  InjectedWalletOptions,
  CustomWindow,
  InjectedWalletModule,
  EIP6963AnnounceProviderEvent,
  InjectedProvider
} from './types.js'

declare const window: CustomWindow

export { ProviderIdentityFlag, ProviderLabel } from './types.js'

const providers6963: InjectedWalletModule[] = []
function checkFor6963Providers() {
  // Add event listener for 'eip6963:announceProvider' event
  window.addEventListener('eip6963:announceProvider', (event: Event) => {
    const eipEvent = event as EIP6963AnnounceProviderEvent
    const { detail } = eipEvent
    if (!detail) return

    if (eipEvent) {
      const result = validateEIP6963ProviderDetail(detail)

      if (result && result.error) throw result.error
    }

    const { info, provider } = detail
    const { name, icon } = info

    if (containsExecutableJavaScript(icon)) {
      console.error(
        `The icon for injected wallet: ${name} contains executable JavaScript and has been blocked.`
      )
      return
    }

    // Push the provider information to the providers6963 array
    providers6963.push({
      label: name,
      getIcon: async () => icon,
      getInterface: async () => ({
        provider
      }),
      platforms: ['all'],
      eip6963Provider: provider as InjectedProvider,
      checkProviderIdentity: ({ provider }) => !!provider
    })
  })

  // Dispatch a custom event to request the provider information
  window.dispatchEvent(new CustomEvent('eip6963:requestProvider'))
}

function injected(options?: InjectedWalletOptions): WalletInit {
  if (typeof window === 'undefined') return () => null

  if (options) {
    const result = validateWalletOptions(options)

    if (result && result.error) throw result.error
  }

  !options?.disable6963Support && checkFor6963Providers()

  return helpers => {
    const { device } = helpers

    const {
      custom = [],
      filter = {},
      displayUnavailable,
      sort,
      walletUnavailableMessage
    } = options || {}

    // combine custom with standard wallets and dedupe
    const allWallets = uniqBy(
      [...custom, ...providers6963, ...standardWallets],
      ({ label }) => label
    )

    const wallets = allWallets.reduce(
      (acc: InjectedWalletModule[], wallet: InjectedWalletModule) => {
        const {
          label,
          platforms,
          injectedNamespace,
          checkProviderIdentity,
          eip6963Provider
        } = wallet

        const walletFilters = filter[label]
        const filteredWallet = walletFilters === false
        const provider =
          eip6963Provider ||
          (window[injectedNamespace!] as CustomWindow['ethereum'])

        const walletAvailable = isWalletAvailable(
          provider,
          checkProviderIdentity,
          device
        )

        let excludedDevice: boolean = false

        // dev specified platform filters
        if (
          Array.isArray(walletFilters) &&
          (walletFilters.includes(device.type) ||
            walletFilters.includes(device.os.name))
        ) {
          excludedDevice = true
        }

        // unavailable filter
        if (walletFilters === 'unavailable' && !walletAvailable) {
          excludedDevice = true
        }

        // wallet specified platform filters
        const invalidPlatform =
          !platforms.includes('all') &&
          !platforms.includes(device.type) &&
          !platforms.includes(device.os.name)

        const supportedWallet =
          !filteredWallet &&
          !excludedDevice &&
          !invalidPlatform &&
          (walletAvailable ||
            displayUnavailable === true ||
            (Array.isArray(displayUnavailable) &&
              displayUnavailable.length &&
              displayUnavailable.includes(wallet.label)))

        if (supportedWallet) {
          acc.push(
            // modify wallet to display error if unavailable but displayUnavailable is set
            (displayUnavailable === true ||
              (Array.isArray(displayUnavailable) &&
                displayUnavailable.length &&
                displayUnavailable.includes(wallet.label))) &&
              !walletAvailable
              ? {
                  ...wallet,
                  getInterface: async () => {
                    throw new Error(
                      walletUnavailableMessage
                        ? walletUnavailableMessage(wallet)
                        : defaultWalletUnavailableMsg(wallet)
                    )
                  }
                }
              : // otherwise add wallet to list as is
                wallet
          )
        }

        return acc
      },
      [] as InjectedWalletModule[]
    )

    if (wallets.length) {
      const moreThanOneWallet = wallets.length > 1

      // if more than one wallet, then remove detected wallet
      const formattedWallets = wallets
        .filter((wallet: InjectedWalletModule) => {
          const { label } = wallet
          return !(label === ProviderLabel.Detected && moreThanOneWallet)
        })
        // then map to the WalletModule interface
        .map(({ label, getIcon, getInterface }: InjectedWalletModule) => ({
          label,
          getIcon,
          getInterface
        }))
        // default sort by alphabetical
        .sort((a, b) => (a.label < b.label ? -1 : a.label > b.label ? 1 : 0))

      return sort ? sort(formattedWallets) : formattedWallets
    }

    return []
  }
}

export default injected
