import Joi from 'joi'
import { EIP6963ProviderDetail, InjectedWalletOptions } from './types.js'
import { validate, type ValidateReturn } from '@web3-onboard/common'

const walletModule = Joi.object({
  label: Joi.string().required(),
  getIcon: Joi.function().arity(0).required(),
  getInterface: Joi.function().maxArity(1).required(),
  injectedNamespace: Joi.string().required(),
  checkProviderIdentity: Joi.function().arity(1).required(),
  platforms: Joi.array().items(Joi.string()),
  externalUrl: Joi.string()
})

const wallets = Joi.array().items(walletModule)

const filter = Joi.object().pattern(
  /\w+/,
  Joi.any().allow(Joi.boolean(), Joi.array().items(Joi.string()))
)

const walletOptions = Joi.object({
  custom: wallets,
  filter,
  displayUnavailable: [Joi.boolean(), Joi.array().items(Joi.string())],
  walletUnavailableMessage: Joi.function(),
  sort: Joi.function(),
  externalUrl: Joi.string(),
  disable6963Support: Joi.boolean()
})

export const validateWalletOptions = (
  data: InjectedWalletOptions | Partial<InjectedWalletOptions>
): ValidateReturn => validate(walletOptions, data)

const eip6963ProviderInfo = Joi.object({
  uuid: Joi.string().required(),
  name: Joi.string().required(),
  icon: Joi.string().required(),
  rdns: Joi.string().required()
})

const eip6963ProviderDetail = Joi.object({
  info: eip6963ProviderInfo.required(),
  provider: Joi.object().required()
})

export const validateEIP6963ProviderDetail = (
  data: EIP6963ProviderDetail
): ValidateReturn => validate(eip6963ProviderDetail, data)
