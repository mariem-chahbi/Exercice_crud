import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import Joi from "joi";
export const JWT_SECRET = "ISAMM_SECRET";
const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("user", "admin").required(),
  // Add other fields validation as needed
});

export const signup = async (req, res, next) => {
  const { error } = signupSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const hashedPWD = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      ...req.body,
      password: hashedPWD,
    });
    await user.save();
    const { password, ...newUser } = user.toObject();

    res.status(200).json({ model: newUser, message: "success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



export const login = async (req, res, next) => {
  try {
    // Check if email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(401).json({ message: "Email or password not found" });
      return;
    }

    // Check if password matches
    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) {
      return res.status(400).json({ message: "Invalid password" });
    }
    res.status(200).json({
      token: jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: "24h",
      }),
    });

    //TODO check email
    //TODO if not exist return error
    //TODO check password
    //TODO if not match return error
    //TODO return token
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
