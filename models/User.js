import mongoose from "mongoose";
import Joi from "joi";
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});
const validateUser = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid("admin", "user").default("user"),
  });

  return schema.validate(user);
};

userSchema.statics.validateUser = validateUser;
export default mongoose.model("User", userSchema);
