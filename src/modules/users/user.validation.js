import Joi from 'joi';

export const passwordReg =/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

export default {
	signup: {
		email: Joi.string().email().required(),
		password: Joi.string().regex(passwordReg).required(),
		firstname: Joi.string().required();
		lastname: Joi.string().required();
		username: Joi.string().required();
	},
}