import Joi from 'joi'
import type { TransactionPreviewInitOptions } from './types.js'
import { validate, type ValidateReturn } from '@web3-onboard/common'

const initOptions = Joi.object({
  apiKey: Joi.string().required(),
  secretKey: Joi.string().required(),
  containerElement: Joi.string(),
  i18n: Joi.object().unknown(),
})

export const validateTPInit = (
  request: TransactionPreviewInitOptions
): ValidateReturn => validate(initOptions, request)
