import Joi from 'joi'
import { RequestOptions, StreamOptions } from 'types'

const requestOptions = Joi.object({
  endpoint: Joi.string().valid('blockPrices').required(),
  chains: Joi.array().items(Joi.string().valid('0x1', '0x89')).required(),
  apiKey: Joi.string(),
  poll: Joi.number().min(1000).max(5000)
})

type ValidateReturn = Joi.ValidationResult | null

const validate = (validator: Joi.Schema, data: unknown): ValidateReturn => {
  const result = validator.validate(data)
  return result.error ? result : null
}

export const validateRequest = (
  request: RequestOptions | StreamOptions
): ValidateReturn => validate(requestOptions, request)
