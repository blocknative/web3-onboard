import Joi from 'joi'
import type { ChainId, WalletModule } from '@bn-onboard/types'

const chainId = Joi.string().pattern(/^0x[0-9a-fA-F]+$/)

const unknownObject = Joi.object().unknown()
const address = Joi.string().pattern(/^0x[a-fA-F0-9]{40}$/)

const chain = Joi.object({
  id: Joi.string().required(),
  rpcUrl: Joi.string().required(),
  label: Joi.string(),
  token: Joi.string()
})

const ens = Joi.any().allow(
  Joi.object({
    name: Joi.string().required(),
    avatar: Joi.string(),
    contentHash: Joi.any().allow(Joi.string(), null),
    getText: Joi.function().arity(1).required()
  }),
  null
)

const balance = Joi.any().allow(
  Joi.object({
    eth: Joi.number()
  }).unknown(),
  null
)

const account = {
  address: Joi.string().required(),
  ens,
  balance
}

const chains = Joi.array().items(chain)
const accounts = Joi.array().items(account)

type ValidateReturn = Joi.ValidationResult | null

function validate(validator: Joi.Schema, data: unknown): ValidateReturn {
  const result = validator.validate(data)
  return result.error ? result : null
}
