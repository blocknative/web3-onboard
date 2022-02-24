import { InjectedWalletOptions } from './types'

import Joi from 'joi'

const walletModule = Joi.object({
  label: Joi.string().required(),
  getIcon: Joi.function().arity(1).required(),
  getInterface: Joi.function().arity(1).required(),
  injectedNamespace: Joi.string().required(),
  checkProviderIdentity: Joi.function().arity(1).required().required(),
  platforms: Joi.array().items(Joi.string())
})

const wallets = Joi.array().items(walletModule)
const filter = Joi.object().pattern(/\w/, Joi.string())
const walletOptions = Joi.object({
  custom: wallets,
  filter
})

type ValidateReturn = Joi.ValidationResult | null

const validate = (validator: Joi.Schema, data: unknown): ValidateReturn => {
  const result = validator.validate(data)
  return result.error ? result : null
}

export const validateWalletOptions = (
  data: InjectedWalletOptions | Partial<InjectedWalletOptions>
): ValidateReturn => validate(walletOptions, data)
