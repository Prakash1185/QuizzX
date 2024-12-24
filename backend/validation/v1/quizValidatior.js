import Joi from 'joi';

const QuizValidator = async (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().min(5).max(100).required().messages({
            'string.base': 'Invalid title',
            'string.empty': 'Title is required',
            'string.min': 'Title should have a minimum length of 5',
            'string.max': 'Title should have a maximum length of 60',
            'any.required': 'Title is required'
        }),
        bannerImage: Joi.string().required().messages({
            'string.base': 'Invalid banner image link',
            'string.empty': 'Banner image is required',
            'any.required': 'Banner image is required'
        }),
        description: Joi.string().min(10).max(500).required().messages({
            'string.base': 'Invalid description',
            'string.empty': 'Description is required',
            'string.min': 'Description should have a minimum length of 10',
            'string.max': 'Description should have a maximum length of 500',
            'any.required': 'Description is required'
        }),
        // quizTimeLimit: Joi.number().required(),
        questionTimeLimit: Joi.number().required()

    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
    }
    next();
}

export { QuizValidator };   