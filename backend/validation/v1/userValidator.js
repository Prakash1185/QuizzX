import Joi from 'joi';

const createAccountValidator = (req, res, next) => {

    // Remove all spaces from the name before validation
    req.body.name = req.body.name.replace(/\s+/g, '');


    const schema = Joi.object({
        name: Joi.string().min(3).max(40).required().messages({
            'string.base': 'Name should be a type of text',
            'string.empty': 'Name cannot be an empty field',
            'string.min': 'Name should have a minimum length of 3',
            'string.max': 'Name should have a maximum length of 40',
            'any.required': 'Name is a required field'
        }),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
    }
    next();
};

export { createAccountValidator };