const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const ErrorRespond = require("../helpers/ErrorRespond");
const generateRandomNum = require("../helpers/generateRandomNum");

class UserController {
  /**
   * ROUTE - POST - /api/auth/register
   * @access - PUBLIC
   * @param {email, ussername, password} req
   * @returns {accessToken, email, profilePic, username, _id}
   */
  static registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username) return ErrorRespond(res, 400, "Username is required");
    else if (!email) return ErrorRespond(res, 400, "Email is required");
    else if (
      !String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    )
      return ErrorRespond(res, 400, "Please enter a valid email.");

    if (!password) return ErrorRespond(res, 400, "Password is required");
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    if (!passwordRegex.test(password)) {
      return ErrorRespond(
        res,
        400,
        "Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, one special character, and be at least 8 characters long."
      );
    }

    const userAvailable = await User.findOne({ email, username });
    if (userAvailable) {
      return ErrorRespond(res, 400, "User already registered!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const randomNumber = generateRandomNum(1, 50);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      profilePic: `https://xsgames.co/randomusers/assets/avatars/pixel/${randomNumber}.jpg`,
    });
    if (newUser) {
      const accessToken = jwt.sign(
        {
          user: {
            email: newUser.email,
            id: newUser._id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        username: newUser.username,
        profilePic: newUser.profilePic,
        accessToken: accessToken,
      });
    } else return ErrorRespond(res, 400, "User data invalid!");
  });

  /**
   * ROUTE - POST - /api/auth/login
   * @access - PUBLIC
   * @param {email, password} req
   * @returns {accessToken, email, profilePic, username, _id}
   */
  static loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return ErrorRespond(res, 400, "All fields are mandatory!");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return ErrorRespond(res, 404, "User not found!");
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        {
          user: {
            email: user.email,
            id: user.id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET
        // { expiresIn: "1h" }
      );
      res.status(200).json({
        _id: user._id,
        email: user.email,
        username: user.username,
        profilePic: user.profilePic,
        accessToken,
      });
    } else {
      return ErrorRespond(res, 401, "Incorrect password!");
    }
  });
}
module.exports = UserController;
