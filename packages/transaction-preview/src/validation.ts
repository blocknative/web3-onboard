import Joi from 'joi'
import type {
  TransactionPreviewInitOptions, TransactionPreviewOptions
} from './types.js'
import { validate, type ValidateReturn } from '@web3-onboard/common'

const initOptions = Joi.object({
  apiKey: Joi.string().required(),
  sdk: Joi.object().required(),
  containerElement: Joi.string().required(),
  requireTransactionApproval: Joi.boolean(),
  i18n: Joi.object().unknown()
})

export const validateTPInit = (
  request: TransactionPreviewInitOptions
): ValidateReturn => validate(initOptions, request)

const transactionPreviewOptions = Joi.object({
  requireTransactionApproval: Joi.boolean(),
  i18n: Joi.object().unknown()
})

export const validateTPOptions = (
  request: TransactionPreviewOptions
): ValidateReturn => validate(transactionPreviewOptions, request)
