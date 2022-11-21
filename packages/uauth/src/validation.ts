import * as Joi from 'joi'
import type { UauthInitOptions } from './types.js'

const uauthOptions = Joi.object({
  clientID: Joi.string().required(),
  redirectUri: Joi.string().required(),
  scope: Joi.string().allow(null),
  shouldLoginWithRedirect: Joi.boolean().allow(null),
  bridge: Joi.string().allow(null),
  qrcodeModalOptions: {
    mobileLinks: Joi.array().allow(null)
  },
  connectFirstChainId: Joi.boolean().allow(null)
})

type ValidateReturn = Joi.ValidationResult | null

const validate = (validator: Joi.Schema, data: unknown): ValidateReturn => {
  const result = validator.validate(data)
  return result.error ? result : null
}

export const validateUauthInitOptions = (
  data: UauthInitOptions
): ValidateReturn => {
  return validate(uauthOptions, data)
}
