import Joi from 'joi'
import type { WalletConnectOptions } from './index.js'

const wcOptions = Joi.object({
  handleUri: Joi.func().optional(),
  version: Joi.number().valid(1, 2).optional(),
  bridge: Joi.string()
    .when('version', {
      is: 1,
      then: Joi.required(),
      otherwise: Joi.forbidden()
    })
    .messages({
      'any.required': `A bridge URL is a required when version is 1 of WalletConnect as the WC team has removed support for their default bridge.`
    }),
  connectFirstChainId: Joi.boolean().optional(),
  qrcodeModalOptions: Joi.object({
    mobileLinks: Joi.array().items(Joi.string()).optional()
  }).optional(),
  projectId: Joi.string()
    .when('version', {
      is: 2,
      then: Joi.required(),
      otherwise: Joi.optional()
    })
    .messages({
      'any.required': `WalletConnect version 2 requires a projectId. Please visit https://cloud.walletconnect.com to get one.`
    }),
  dappUrl: Joi.string().optional(),
  requiredChains: Joi.array().items(Joi.number()).optional(),
  optionalChains: Joi.array().items(Joi.number()).optional(),
  qrModalOptions: Joi.object().optional(),
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
