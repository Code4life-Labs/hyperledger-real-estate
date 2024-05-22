import Joi from 'joi'

const authenticateSchema = Joi.object({
  username: Joi.string().required().trim(),
  password: Joi.string().required().trim()
})

export const identitySchema = {
  authenticateSchema
}