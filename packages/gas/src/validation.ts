import Joi from 'joi'
import { EstimateOptions, GasInit } from 'types'

const init = Joi.object({
  apiKey: Joi.string().required()
}).required()

const estimateOptions = Joi.object({
  chainId: Joi.string().valid('0x1', '0x89').required(),
  poll: Joi.number()
}).required()

type ValidateReturn = Joi.ValidationResult | null

const validate = (validator: Joi.Schema, data: unknown): ValidateReturn => {
  const result = validator.validate(data)
  return result.error ? result : null
}

export const validateInit = (data: GasInit): ValidateReturn =>
  validate(init, data)

export const validateEstimateOptions = (
  data: EstimateOptions
): ValidateReturn => validate(estimateOptions, data)
