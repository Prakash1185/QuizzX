import Joi from 'joi';

export const adminRegisterValidator = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required().messages({
            'string.base': 'Invalid email address',
            'string.empty': 'Pleses enter a valid email address',
            'string.email': 'Invalid email address',
            'any.required': 'Email address is a required'
        }),
        password: Joi.string().min(6).max(50).required().messages({
            'string.base': 'Invalid Password',
            'string.empty': 'Please enter a password',
            'string.min': 'Password should have a minimum length of 6',
            'string.max': 'Password should have a maximum length of 50',
            'any.required': 'Password is required'
        }),
        secretKey: Joi.string().required().messages({
            'string.base': 'Inavlid secret key',
            'string.empty': 'Please enter a secret key',
            'any.required': 'Secret Key is required'
        })
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
    }
    next();
}

