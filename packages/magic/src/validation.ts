import Joi from 'joi'
import type { MagicInitOptions } from './types'

const userEmail = Joi.string()
  .email({ tlds: { allow: false } })
  .allow(null)

const magicOptions = Joi.object({
  apiKey: Joi.string().required(),
  userEmail: userEmail
})

type ValidateReturn = Joi.ValidationResult | null

const validate = (validator: Joi.Schema, data: unknown): ValidateReturn => {
  const result = validator.validate(data)
  return result.error ? result : null
}

export const validateMagicInitOptions = (
  data: MagicInitOptions
): ValidateReturn => {
  return validate(magicOptions, data)
}

export const validateUserEmail = (email: string): ValidateReturn => {
  return validate(userEmail, email)
}
