import Joi from 'joi'

export type ValidateReturn = Joi.ValidationResult | null

export function validate(validator: Joi.Schema, data: unknown): ValidateReturn {
  const result = validator.validate(data)
  return result.error ? result : null
}

export const chainIdValidation = Joi.alternatives().try(
  Joi.string().pattern(/^0x[0-9a-fA-F]+$/),
  Joi.number().positive()
)

export const chainNamespaceValidation = Joi.string().valid('evm')

/** Related to ConnectionInfo from 'ethers/lib/utils' */
export const providerConnectionInfoValidation = Joi.object({
  url: Joi.string().required(),
  headers: Joi.object(),
  user: Joi.string(),
  password: Joi.string(),
  allowInsecureAuthentication: Joi.boolean(),
  allowGzip: Joi.boolean(),
  throttleLimit: Joi.number(),
  throttleSlotInterval: Joi.number(),
  throttleCallback: Joi.function(),
  timeout: Joi.number()
})

export const chainValidation = Joi.object({
  namespace: chainNamespaceValidation,
  id: chainIdValidation.required(),
  rpcUrl: Joi.string().required(),
  label: Joi.string().required(),
  token: Joi.string().required(),
  icon: Joi.string(),
  color: Joi.string(),
  publicRpcUrl: Joi.string(),
  blockExplorerUrl: Joi.string(),
  providerConnectionInfoValidation
})
