import {
  WalletInit,
  EIP1193Provider,
  ProviderRpcError,
  ProviderRpcErrorCode,
  ProviderAccounts
} from '@web3-onboard/common'
import type { Config } from '@particle-network/auth'

/**
 * Represents the different authentication methods available.
 * @typedef {'email' | 'phone' | 'google' | 'apple' | 'twitter' | 'facebook' | 'microsoft' | 'linkedin' | 'github' | 'twitch' | 'discord'} AuthTypes
 */
type AuthTypes =
  | 'email'
  | 'phone'
  | 'google'
  | 'apple'
  | 'twitter'
  | 'facebook'
  | 'microsoft'
  | 'linkedin'
  | 'github'
  | 'twitch'
  | 'discord'

/**
 * Interface for setting a preferred social login type and whether it should be displayed or just routed through the standard menu item.
 * @interface
 */
interface PreferredAuthType {
  type: AuthTypes
  setAsDisplay: boolean
}

/**
 * Configuration options enabling custom authentication type selection, extending the basic Config.
 * @interface
 * @extends {Config}
 */
interface ParticleAuthModuleOptions extends Config {
  preferredAuthType?: AuthTypes | PreferredAuthType
}

const getDisplayLabel = (authType?: string, shouldSetDisplay?: boolean) => {
  if (authType) {
    return shouldSetDisplay
      ? authType.charAt(0).toUpperCase() + authType.slice(1)
      : 'Particle Network'
  }
  return 'Particle Network'
}

const particleAuth = (options: ParticleAuthModuleOptions): WalletInit => {
  const { preferredAuthType, ...otherOptions } = options
  const isAuthTypeObject = typeof preferredAuthType === 'object'
  const authType =
    isAuthTypeObject && preferredAuthType ? preferredAuthType.type : undefined
  const setAsDisplay =
    isAuthTypeObject && preferredAuthType
      ? preferredAuthType.setAsDisplay
      : false

  const displayLabel = getDisplayLabel(authType, setAsDisplay)

  return () => ({
    label: displayLabel,
    getIcon: async () => {
      const icons = await Promise.all([
        import('./email.js'),
        import('./phone.js'),
        import('./google.js'),
        import('./apple.js'),
        import('./twitter.js'),
        import('./facebook.js'),
        import('./microsoft.js'),
        import('./linkedin.js'),
        import('./github.js'),
        import('./twitch.js'),
        import('./discord.js'),
        import('./icon.js')
      ])

      const iconMap = {
        email: icons[0].default,
        phone: icons[1].default,
        google: icons[2].default,
        apple: icons[3].default,
        twitter: icons[4].default,
        facebook: icons[5].default,
        microsoft: icons[6].default,
        linkedin: icons[7].default,
        github: icons[8].default,
        twitch: icons[9].default,
        discord: icons[10].default,
        icon: icons[11].default
      }
      const iconName =
        authType && setAsDisplay ? authType : ('icon' as AuthTypes)
      return iconMap[iconName]
    },
    getInterface: async ({ chains }) => {
      const { createEIP1193Provider } = await import('@web3-onboard/common')
      const { ParticleNetwork } = await import('@particle-network/auth')
      const { ParticleProvider } = await import('@particle-network/provider')
      let [currentChain] = chains
      const { label, id } = currentChain

      const chainName = label
        ? label.split(' ')[0].toLowerCase()
        : 'defaultChainName'
      const chainId = parseInt(id.toString(), 16)

      const particleConfig: Config = {
        ...otherOptions,
        chainName,
        chainId
      }

      let particle = new ParticleNetwork(particleConfig)
      let provider = new ParticleProvider(particle.auth)

      provider = (function patchProvider(provider: any): any {
        const patchedProvider = createEIP1193Provider(provider, {
          eth_selectAccounts: null,
          eth_requestAccounts: async ({ baseRequest }) => {
            try {
              const accounts = await baseRequest({ method: 'eth_accounts' })
              return accounts as ProviderAccounts
            } catch (error) {
              console.error(error)
              throw new ProviderRpcError({
                code: ProviderRpcErrorCode.ACCOUNT_ACCESS_REJECTED,
                message: 'Account access rejected'
              })
            }
          }
        })

        patchedProvider.disconnect = () => particle.auth.logout()
        return patchedProvider
      })(provider)

      return {
        provider,
        instance: particle
      }
    }
  })
}

export default particleAuth
