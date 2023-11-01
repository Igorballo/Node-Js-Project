const Joi = require('joi');

const validator = (schema) => (payload) =>
    schema.validate(payload, { abortEarly: false})

const CompanySchema = Joi.object({
    raison_social: Joi.string()
        .alphanum()
        .min(5)
        .max(30)
        .required(),


    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),

    adress: Joi.string()
        .required()
        .alphanum()
        .min(2)
        .max(7),

    employe_count: Joi.number()
        .integer()
        .min(1)
        .required(),

    created_year: Joi.number()
        .integer()
        .min(1900)
        .max(2200)
        .required(),

    status: Joi.boolean()
        .default(false),
})

exports.validateCompany = validator(CompanySchema);