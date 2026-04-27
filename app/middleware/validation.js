const Joi = require('joi')

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false })
  if (error) {
    const errors = error.details.map((detail) => detail.message)
    return res.status(400).json({ success: false, errors })
  }
  next()
}

const schemas = {
  // Auth Schemas
  adminRegister: Joi.object({
    adminName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().required(),
  }),
  writerRegister: Joi.object({
    writerName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
  userRegister: Joi.object({
    userName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),

  // Blog Schemas
  blog: Joi.object({
    title: Joi.string().min(5).max(200).required(),
    content: Joi.string().min(10).required(),
    excerpt: Joi.string().allow('', null),
    category: Joi.string().length(24).allow(null),
    status: Joi.string().valid('draft', 'pending', 'published', 'rejected'),
  }),

  categorySchema: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().allow('', null),
  }),

  // Interaction Schemas
  comment: Joi.object({
    content: Joi.string().min(1).max(500).required(),
  }),
}

module.exports = { validate, schemas }
