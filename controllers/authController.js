import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validateRegister, validateLogin } from "../validations/userValidation.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Validate input
    const { isValid, errors } = validateRegister(req.body);
    if (!isValid) {
      return res.status(400).send({ message: "Validation error", errors });
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "Email is already registered." });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(201).send({
      message: "User registered successfully.",
      user: { id: user._id, username: user.username, email: user.email, role: user.role },
    });
  } catch (error) {
    return res.status(500).send({ message: "Server error.", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    const { isValid, errors } = validateLogin(req.body);
    if (!isValid) {
      return res.status(400).send({ message: "Validation error", errors });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "Invalid email or password." });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid email or password." });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).send({
      message: "Login successful.",
      token,
      user: { id: user._id, username: user.username, email: user.email, role: user.role },
    });
  } catch (error) {
    return res.status(500).send({ message: "Server error.", error: error.message });
  }
};

// export { registerUser, loginUser };

