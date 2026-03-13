import Joi from 'joi'
import { RequestOptions, StreamOptions } from './types.js'
import { validate, type ValidateReturn } from '@web3-onboard/common'

const requestOptions = Joi.object({
  endpoint: Joi.string().valid('blockPrices').required(),
  chains: Joi.array().items(Joi.string().valid('0x1', '0x89')).required(),
  apiKey: Joi.string(),
  poll: Joi.number().min(1000).max(5000)
})

export const validateRequest = (
  request: RequestOptions | StreamOptions
): ValidateReturn => validate(requestOptions, request)
