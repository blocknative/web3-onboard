import Joi from 'joi'
import type { UauthInitOptions } from './types.js'

const uauthOptions = Joi.object({
  clientID: Joi.string().required(),
  redirectUri: Joi.string().required(),
  scope: Joi.string().allow(null),
  shouldLoginWithRedirect: Joi.boolean().allow(null),
  walletConnectProjectId: Joi.string().required(),
  requiredChains: Joi.array().items(Joi.number()),
  optionalChains: Joi.array().items(Joi.number()),
  additionalOptionalMethods: Joi.array().items(Joi.string()),
  handleUri: Joi.function()
})

type ValidateReturn = Joi.ValidationResult | null

const validate = (
  validator: Joi.AnySchema<any>,
  data: unknown
): ValidateReturn => {
  const result = validator.validate(data)
  return result.error ? result : null
}

export const validateUauthInitOptions = (
  data: UauthInitOptions
): ValidateReturn => {
  return validate(uauthOptions, data)
}
