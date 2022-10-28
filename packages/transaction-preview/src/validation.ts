import Joi from 'joi'
import { TransactionPreviewInitOptions } from './types.js'
import { validate, type ValidateReturn } from '@web3-onboard/common'

const initOptions = Joi.object({
  apiKey: Joi.string().required(),
  provider: Joi.object().unknown().required(),
  containerElement: Joi.string(),
  network: Joi.string()
})

export const validateTPInit = (
  request: TransactionPreviewInitOptions
): ValidateReturn => validate(initOptions, request)
