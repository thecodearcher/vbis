import Joi from 'joi';

export const UpdateUserValidationSchema = Joi.object().keys({
    firstname: Joi.string(),
    lastname: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().min(6),
    dob: Joi.date().iso(),
});
