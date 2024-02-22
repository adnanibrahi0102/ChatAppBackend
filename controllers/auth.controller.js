import {
  comparePassword,
  generateJWToken,
  hashYourPassword,
} from "../helper/auth.helper.js";
import User from "../models/user.model.js";

export const signUpController = async (req, res) => {
  try {
    const { fullName, userName, password, gender, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    if (!fullName || !userName || !password || !gender || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ userName });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    // Hashing of Password
    const hashedPassword = await hashYourPassword(password);
    const newUser = new User({
      fullName,
      userName,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });
    if (newUser) {
      // generating JWT
      generateJWToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        message: "User Registerd Successfully",
        success: true,
        newUser,
      });
    }
  } catch (error) {
    res.status(404).send({
      message: "Error while creating user",
      success: false,
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Password or userName does not match" });
    }
    // generating JWT
    generateJWToken(user._id, res);
    res.status(200).json({
      message: "Login Successfull",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error",
      success: false,
      error,
    });
  }
};

export const logoutController = (req, res) => {
  try {
    res.cookie("JWT", "", { maxAge: 0 });
    res.status(200).json({
      message: "Logout Successfull",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error",
      success: false,
      error,
    });
  }
};
