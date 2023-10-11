import Joi from 'joi'
import type { WalletConnectOptions } from './types.js'

const wcOptions = Joi.object({
  handleUri: Joi.func().optional(),
  version: Joi.number()
    .optional()
    .custom((value, helpers) => {
      if (value === 1) {
        console.warn(
          'Version 1 of WalletConnect has been fully deprecated. This version of @web3-onboard/walletconnect only supports version 2'
        )
      } else if (value !== 2 && value !== undefined) {
        return helpers.error('any.invalid', {
          message: 'Invalid version number. This version of @web3-onboard/walletconnect only supports version 2'
        })
      }
      return value // return the value unchanged if it's valid or not provided
    }, 'Custom version validation'),
  projectId: Joi.string().messages({
    'any.required': `WalletConnect version 2 requires a projectId. Please visit https://cloud.walletconnect.com to get one.`
  }),
  dappUrl: Joi.string()
    .optional()
    .custom((value, helpers) => {
      if (!value) {
        return helpers.message({
          message:
            'It is strongly recommended to supply a dappUrl as it is required by some wallets (i.e. MetaMask) to allow connection.',
          type: 'any.custom'
        })
      }
      return value // return the value unchanged if it's provided
    }, 'Custom dappUrl validation'),
  requiredChains: Joi.array().items(Joi.number()).optional(),
  optionalChains: Joi.array().items(Joi.number()).optional(),
  qrModalOptions: Joi.object().optional(),
  additionalRequiredMethods: Joi.array().items(Joi.string()).optional(),
  additionalOptionalMethods: Joi.array().items(Joi.string()).optional()
})

type ValidateReturn = Joi.ValidationResult | null

const validate = (
  validator: Joi.AnySchema<any>,
  data: unknown
): ValidateReturn => {
  const result = validator.validate(data)
  return result.error ? result : null
}

export const validateWCInitOptions = (
  data: WalletConnectOptions
): ValidateReturn => {
  return validate(wcOptions, data)
}
