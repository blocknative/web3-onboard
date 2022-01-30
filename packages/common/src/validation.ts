import Joi from 'joi'
import type { SelectAccountOptions } from './types'

const basePath = Joi.object({
  label: Joi.string().required(),
  value: Joi.string().required()
})
const basePaths = Joi.array().items(basePath)

const chain = Joi.object({
  id: Joi.string().required(),
  label: Joi.string(),
  token: Joi.string().required(),
  rpcUrl: Joi.string()
})
const chains = Joi.array().items(chain)

const asset = Joi.object({
  label: Joi.string().required(),
  address: Joi.string()
})
const assets = Joi.array().items(asset)

const selectAccountOptions = Joi.object({
  basePaths: basePaths,
  assets: assets,
  chains: chains,
  scanAccounts: Joi.function().arity(1).required(),
  supportsCustomPath: Joi.bool()
})

type ValidateReturn = Joi.ValidationResult | null

const validate = (validator: Joi.Schema, data: unknown): ValidateReturn => {
  const result = validator.validate(data)
  return result.error ? result : null
}

export const validateSelectAccountOptions = (
  data: SelectAccountOptions
): ValidateReturn => {
  return validate(selectAccountOptions, data)
}
