import joi from "joi";

const opsSchema = joi.object({
    amount: joi.number().required(),
    description: joi.string().required()
});

export default opsSchema;