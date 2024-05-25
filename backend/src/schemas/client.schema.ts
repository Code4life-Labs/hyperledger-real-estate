import Joi from 'joi'

const identityClientSchema = Joi.object({
  username: Joi.string().required().trim(),
  password: Joi.string().required().trim()
})

const addEditClientSchema = Joi.object({
  birthDate: Joi.string().trim(),
  firstName: Joi.string().trim(),
  lastName: Joi.string().trim()
})

export const clientSchema = {
  identityClientSchema,
  addEditClientSchema
}