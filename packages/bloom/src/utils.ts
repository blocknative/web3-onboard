import type { CoreTypes } from '@walletconnect/types'

export function getMetaData(appMetadata: any): CoreTypes.Metadata | undefined {
  if (!appMetadata) return undefined
  const wcMetaData: CoreTypes.Metadata = {
    name: appMetadata.name,
    description: appMetadata.description || '',
    url: appMetadata.explore || appMetadata.gettingStartedGuide || '',
    icons: []
  }

  if (appMetadata.icon !== undefined && appMetadata.icon.length) {
    wcMetaData.icons = [appMetadata.icon]
  }
  if (appMetadata.logo !== undefined && appMetadata.logo.length) {
    wcMetaData.icons = wcMetaData.icons.length
      ? [...wcMetaData.icons, appMetadata.logo]
      : [appMetadata.logo]
  }

  return wcMetaData
}

export function buildWCChains(
  requiredChains: number[],
  optionalChains: number[],
  chains: { id: string }[]
): {
  requiredChains: number[]
  optionalChains: number[]
} {
  // default to mainnet
  const requiredChainsParsed: number[] =
    Array.isArray(requiredChains) &&
    requiredChains.length &&
    requiredChains.every(num => !isNaN(num))
      ? // @ts-ignore
        // Required as WC package does not support hex numbers
        requiredChains.map(chainID => parseInt(chainID))
      : []

  // Defaults to the chains provided within the web3-onboard init chain property
  const optionalChainsParsed: number[] =
    Array.isArray(optionalChains) &&
    optionalChains.length &&
    optionalChains.every(num => !isNaN(num))
      ? // @ts-ignore
        // Required as WC package does not support hex numbers
        optionalChains.map(chainID => parseInt(chainID))
      : chains.map(({ id }) => parseInt(id, 16))

  return {
    requiredChains: requiredChainsParsed,
    optionalChains: optionalChainsParsed
  }
}

export function buildWCMethods(
  additionalRequiredMethods: string[],
  additionalOptionalMethods: string[],
  requiredMethods: string[],
  allMethods: string[]
): {
  requiredMethods: string[]
  optionalMethods: string[]
} {
  const requiredMethodsSet = new Set(
    additionalRequiredMethods && Array.isArray(additionalRequiredMethods)
      ? [...additionalRequiredMethods, ...requiredMethods]
      : requiredMethods
  )
  const _requiredMethods = Array.from(requiredMethodsSet)

  const optionalMethods =
    additionalOptionalMethods && Array.isArray(additionalOptionalMethods)
      ? [...additionalOptionalMethods, ...allMethods]
      : allMethods

  return {
    requiredMethods: _requiredMethods,
    optionalMethods
  }
}
