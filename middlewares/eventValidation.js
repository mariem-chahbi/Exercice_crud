import Joi from "joi";
const eventSchemaJoi = Joi.object({
  title: Joi.string().min(3).max(50).required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().greater(Joi.ref("startDate")).required().messages({
    "date.greater": "La date de fin doit être postérieure à la date de début.",
  }),
});

export const validateEvent = (req, res, next) => {
  const { error } = eventSchemaJoi.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};
