import opsSchema from "../schemas/operationsSchemas.js";

export default function operationsValidation(req, res, next) {
    const validation = opsSchema.validate(req.body, { abortEarly: false });
    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    };
    next();
};