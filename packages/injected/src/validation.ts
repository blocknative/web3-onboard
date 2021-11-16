import { InjectedWalletOptions } from '@bn-onboard/types'

import {
  string,
  object,
  array,
  function as joiFunction,
  Schema,
  ValidationResult
} from 'joi'

const walletModule = object({
  label: string().required(),
  getIcon: joiFunction().arity(1).required(),
  getInterface: joiFunction().arity(1).required(),
  injectedNamespace: string().required(),
  checkProviderIdentity: joiFunction().arity(1).required().required(),
  platforms: array().items(string())
})

const wallets = array().items(walletModule)
const exclusions = object().pattern(/\w/, string())
const walletOptions = object({
  wallets,
  exclusions
})

type ValidateReturn = ValidationResult | null

const validate = (validator: Schema, data: unknown): ValidateReturn => {
  const result = validator.validate(data)
  return result.error ? result : null
}

export const validateWalletOptions = (
  data: InjectedWalletOptions | Partial<InjectedWalletOptions>
): ValidateReturn => validate(walletOptions, data)
