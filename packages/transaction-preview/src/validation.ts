import Joi from 'joi'
import { InitOptions } from './types.js'
import { validate, type ValidateReturn } from '@web3-onboard/common'

const initOptions = Joi.object({
  apiKey: Joi.string().required(),
  provider: Joi.object().unknown().required(),
  network: Joi.string()
})

export const validateRequest = (
  request: InitOptions
): ValidateReturn => validate(initOptions, request)
