import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//import { capitalize } from "../helpers/index.js";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
dotenv.config();
import baseURL from '../config/baseURL.js';
//import { Readable } from "stream";

// Function to send a verification email
function sendVerificationEmail(email, token) {
  // Setup Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME, // Use environment variables
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Send email
  transporter.sendMail(
    {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: "Account Verification",
      html: `<p>Click the following link to verify your account: <a href="http://localhost:${process.env.PORT}/verify?token=${token}">Verify</a></p>`,
    },
    (err, info) => {
      if (err) {
        console.error("Error sending verification email:", err);
        // Handle the error (e.g., log it, send a response to the client)
      } else {
        console.log("Verification email sent:", info);
        // Handle success (e.g., log it, send a response to the client)
      }
    }
  );
}

export const login = async (req, res, next) => {
  try {
    const foundUser = await User.findOne({
      email: req.body.email,
    });
    if (foundUser) {
      const check = await bcrypt.compare(req.body.password, foundUser.password);

      if (check) {
        const profileImageUrl = foundUser.profileImage
          ? `${baseURL}/profile/profile-image/${foundUser.profileImage.filename}`
          : null;
        const userProfileImageUrl = {
          ...foundUser.toObject(),
          profileImageUrl,
        };

        const token = jwt.sign(
          { _id: foundUser._id, email: foundUser.email },
          process.env.SECRET_KEY,
          { issuer: "PixelCreditHub", expiresIn: "1y" }
        );

        console.log("User token:", token);
        res
          .header("token", token)
          .send({ success: true, data: userProfileImageUrl }); // Not sure if we need "data:"  here
      } else {
        res
          .status(401)
          .send({ success: false, message: "Incorrect email or password"});
      }
    } else {
      res.send({
        success: false,
        message: "Make sure your email/password is correct!",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  console.log(req.body);
  try {
    
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(hashedPassword);

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    res.status(200).send(newUser);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

/* export const register = async (req, res, next) => {
  //console.log(req.body);
  try {
    const { password, confirmPassword } = req.body;
    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = uuidv4();
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
      verificationToken,
      verified: false,
    });
    sendVerificationEmail(newUser.email, verificationToken);
    res.status(200).send(newUser);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    } else {
      next(err);
    }
  }
}; */

export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(203).send(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const userEmail = req.params.email; // Assuming email is in the request parameters
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      // If user with the provided email is not found
      return res.status(404).json({ message: "User not found" });
    }

    const deleteUser = await User.findByIdAndDelete(user._id);
    res.send(deleteUser);
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find();
    res.send(allUsers);
  } catch (err) {
    next(err);
  }
};

//export const getUserByUsername = async (req, res, next) => {
export const getUserByUserId = async (req, res, next) => {
  try {
    //const username = req.params.username;
    //const foundUser = await User.findOne({ name: capitalize(username) });
    const userid = req.params.userid;
    const foundUser = await User.findOne(userid);
    // Fetch user by userId from the database

    if (!foundUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    /*  const userId = foundUser._id;
    const userById = await User.findOne({ _id: userId });

    if (!userById) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    } */

    res.status(200).json({ success: true, data: foundUser });
  } catch (error) {
    next(error);
  }
};
