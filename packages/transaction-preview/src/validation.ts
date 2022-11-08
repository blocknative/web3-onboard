import Joi from 'joi'
import type {
  TransactionPreviewInitOptions,
  TransactionObject
} from './types.js'
import { validate, type ValidateReturn } from '@web3-onboard/common'

const initOptions = Joi.object({
  apiKey: Joi.string().required(),
  secretKey: Joi.string().required(),
  containerElement: Joi.string(),
  i18n: Joi.object().unknown()
})

const transactionObject = Joi.object({
  to: Joi.string().required(),
  from: Joi.string().required(),
  data: Joi.string().required(),
  chainId: Joi.string(),
  gas: Joi.string(),
  gasLimit: Joi.string(),
  value: Joi.string(),
  nonce: Joi.string(),
  gasPrice: Joi.string(),
  maxFeePerGas: Joi.string(),
  maxPriorityFeePerGas: Joi.string()
})

const transactions = Joi.array().items(transactionObject)

const containerElement = Joi.string().required()

export const validateTPInit = (
  request: TransactionPreviewInitOptions
): ValidateReturn => validate(initOptions, request)

export const validateSimTransactions = (
  txs: [TransactionObject]
): ValidateReturn => validate(transactions, txs)

export const validateSetContainerEl = (
  elementId: string
): ValidateReturn => validate(containerElement, elementId)
