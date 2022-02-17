import Joi from 'joi'
import type { ChainId, WalletModule } from '@bn-onboard/common'

import type {
  InitOptions,
  WalletState,
  ConnectOptions,
  DisconnectOptions
} from './types'

// const chainNamespaceRegex = /[-a-z0-9]{3,8}/
// only evm chains are valid at the moment
const chainNamespaceRegex = /eip155/
const chainReferenceRegex = /[-a-zA-Z0-9]{1,32}/
const chainIdRegex = new RegExp(
  `${chainNamespaceRegex.source}:${chainReferenceRegex.source}`
)

const chainId = Joi.string().regex(chainIdRegex)
const unknownObject = Joi.object().unknown()
// const address = Joi.string().regex(/^0x[a-fA-F0-9]{40}$/)

const chain = Joi.object({
  namespace: Joi.string().regex(chainNamespaceRegex),
  reference: Joi.string().regex(chainReferenceRegex),
  rpcUrl: Joi.string().required(),
  label: Joi.string(),
  token: Joi.string()
})

const ens = Joi.any().allow(
  Joi.object({
    name: Joi.string().required(),
    avatar: Joi.string(),
    contentHash: Joi.any().allow(Joi.string(), null),
    getText: Joi.function().arity(1).required()
  }),
  null
)

const balance = Joi.any().allow(
  Joi.object({
    eth: Joi.number()
  }).unknown(),
  null
)

const account = {
  address: Joi.string().required(),
  ens,
  balance
}

const chains = Joi.array().items(chain)
const accounts = Joi.array().items(account)

const wallet = Joi.object({
  label: Joi.string(),
  icon: Joi.string(),
  provider: unknownObject,
  accounts,
  chains: Joi.object().pattern(chainNamespaceRegex, chainReferenceRegex)
})

const recommendedWallet = Joi.object({
  name: Joi.string().required(),
  url: Joi.string().uri().required()
})

const agreement = Joi.object({
  version: Joi.string().required(),
  termsUrl: Joi.string().uri(),
  privacyUrl: Joi.string().uri()
})

const appMetadata = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  icon: Joi.string().required(),
  gettingStartedGuide: Joi.string(),
  email: Joi.string(),
  appUrl: Joi.string(),
  explore: Joi.string(),
  recommendedInjectedWallets: Joi.array().items(recommendedWallet),
  agreement
})

const walletModule = Joi.object({
  label: Joi.string().required(),
  getInfo: Joi.function().arity(1).required(),
  getInterface: Joi.function().arity(1).required()
})

const walletModules = Joi.array().items(Joi.function()).required()

const initOptions = Joi.object({
  wallets: walletModules,
  chains: chains.required(),
  appMetadata: appMetadata,
  i18n: Joi.object().unknown()
})

const connectOptions = Joi.object({
  autoSelect: Joi.string()
})

const disconnectOptions = Joi.object({
  label: Joi.string().required()
}).required()

const setChainOptions = Joi.object({
  chainId: chainId.required(),
  wallet: Joi.string()
})

type ValidateReturn = Joi.ValidationResult | null

function validate(validator: Joi.Schema, data: unknown): ValidateReturn {
  const result = validator.validate(data)
  return result.error ? result : null
}

export function validateWallet(
  data: WalletState | Partial<WalletState>
): ValidateReturn {
  return validate(wallet, data)
}

export function validateInitOptions(data: InitOptions): ValidateReturn {
  return validate(initOptions, data)
}

export function validateWalletModule(data: WalletModule): ValidateReturn {
  return validate(walletModule, data)
}

export function validateConnectOptions(data: ConnectOptions): ValidateReturn {
  return validate(connectOptions, data)
}

export function validateDisconnectOptions(
  data: DisconnectOptions
): ValidateReturn {
  return validate(disconnectOptions, data)
}

export function validateString(str: string): ValidateReturn {
  return validate(Joi.string().required(), str)
}

export function validateSetChainOptions(data: {
  chainId: ChainId
  wallet?: WalletState['label']
}): ValidateReturn {
  return validate(setChainOptions, data)
}
