import Joi from 'joi';

export const LoginValidationSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const SignupValidationSchema = Joi.object().keys({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    dob: Joi.date().iso().required(),
});
