import Joi from 'joi'

export type ValidateReturn = Joi.ValidationResult | null

export function validate(
  validator: Joi.AnySchema<any>,
  data: unknown
): ValidateReturn {
  const result = validator.validate(data)
  return result.error ? result : null
}

export const chainIdValidation = Joi.alternatives().try(
  Joi.string().pattern(/^0x[0-9a-fA-F]+$/),
  Joi.number().positive()
)

export const chainNamespaceValidation = Joi.string().valid('evm')

const secondaryTokenValidation = Joi.object({
  address: Joi.string().required(),
  icon: Joi.string().optional()
})

export const chainValidation = Joi.object({
  namespace: chainNamespaceValidation,
  id: chainIdValidation.required(),
  rpcUrl: Joi.string(),
  label: Joi.string(),
  token: Joi.string(),
  secondaryTokens: Joi.array()
    .max(5)
    .items(secondaryTokenValidation)
    .optional(),
  icon: Joi.string(),
  color: Joi.string(),
  publicRpcUrl: Joi.string(),
  protectedRpcUrl: Joi.string(),
  blockExplorerUrl: Joi.string()
})
