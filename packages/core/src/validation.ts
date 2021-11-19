import {
  number,
  string,
  object,
  array,
  function as joiFunction,
  Schema,
  any,
  ValidationResult
} from 'joi'

import type { ChainId, WalletModule } from '@bn-onboard/types'

import type {
  Chain,
  InitOptions,
  WalletState,
  ConnectOptions,
  DisconnectOptions
} from './types'

const chainId = string().pattern(/^0x[0-9a-fA-F]+$/)

const unknownObject = object().unknown()
const address = string().pattern(/^0x[a-fA-F0-9]{40}$/)

const chain = object({
  id: string().required(),
  rpcUrl: string().required(),
  label: string(),
  token: string()
})

const ens = any().allow(
  object({
    name: string().required(),
    avatar: string(),
    contentHash: any().allow(string(), null),
    getText: joiFunction().arity(1).required()
  }),
  null
)

const balance = any().allow(
  object({
    eth: number()
  }).unknown(),
  null
)

const account = {
  address: string().required(),
  ens,
  balance
}

const chains = array().items(chain)
const accounts = array().items(account)

const wallet = object({
  label: string(),
  icon: string(),
  provider: unknownObject,
  accounts,
  chain: string(),
  ens: object({
    name: string(),
    avatar: string(),
    contentHash: string(),
    getText: joiFunction().arity(1)
  }),
  balance: object().pattern(/\w/, number())
})

const recommendedWallet = object({
  name: string().required(),
  url: string().uri().required()
})

const appMetadata = object({
  name: string().required(),
  description: string().required(),
  icon: string().required(),
  gettingStartedGuide: string(),
  explore: string(),
  recommendedInjectedWallets: array().items(recommendedWallet)
})

const walletModule = object({
  label: string().required(),
  getInfo: joiFunction().arity(1).required(),
  getInterface: joiFunction().arity(1).required()
})

const walletModules = array().items(joiFunction().arity(1)).required()

const initOptions = object({
  apiKey: string(),
  wallets: walletModules,
  appMetadata: appMetadata
})

const connectOptions = object({
  autoSelect: string()
})

const disconnectOptions = object({
  label: string().required()
}).required()

type ValidateReturn = ValidationResult | null

function validate(validator: Schema, data: unknown): ValidateReturn {
  const result = validator.validate(data)
  return result.error ? result : null
}

export function validateChains(data: Chain[]): ValidateReturn {
  return validate(chains, data)
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
  return validate(string().required(), str)
}

export function validateChainId(data: ChainId): ValidateReturn {
  return validate(chainId, data)
}
