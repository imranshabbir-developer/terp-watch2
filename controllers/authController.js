import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).send({ message: "User already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword, role });
    await user.save();

    res.status(201).send({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong.", error });
  }
};

export const loginUser = async (req, res) => {
    
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ message: "User not found." });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).send({ message: "Invalid credentials." });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).send({
      token,
      user: { id: user._id, username: user.username, role: user.role },
    });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong.", error });
  }
};
