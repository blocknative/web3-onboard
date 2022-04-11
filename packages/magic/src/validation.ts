import Joi from 'joi'
import type { MagicInitOptions } from './types'

const magicInitOptions = Joi.object({
  userEmail: Joi.string().required(),
  apiKey: Joi.string()
})

type ValidateReturn = Joi.ValidationResult | null

const validate = (validator: Joi.Schema, data: unknown): ValidateReturn => {
  const result = validator.validate(data)
  return result.error ? result : null
}

export const validateMagicInitOptions = (
  data: MagicInitOptions
): ValidateReturn => {
  return validate(magicInitOptions, data)
}
