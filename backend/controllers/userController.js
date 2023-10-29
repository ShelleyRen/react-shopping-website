const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

//login
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      // _id: user._id,
      // name: user.name,
      // email: user.email,
      token: generateToken(user._id),
      // isAdmin: user.isAdmin,
      //cartItems: user.cartItems,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//@ route GET /api/user
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//update password

const findUser = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const userExists = await User.findOne({ email });

  if (!userExists) {
    res.status(400);
    throw new Error("User does not exist");
  } else {
    res.json({ email });
    // dispatch password reset link
  }
});

//register
const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ email, password });

  if (user) {
    res.status(201).json({
      // _id: user._id,
      // name: user.name,
      // email: user.email,
      token: generateToken(user._id),
      // isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// Get user cart
// @route GET /api/users/cart
// @access Private
const getUserCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      cartItems: user.cartItems,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Update user cart
// @route PUT /api/users/cart
// @access Private
const updateUserCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.cartItems = req.body.cartItems || user.cartItems;

    const updateUser = await user.save();

    res.json({
      cartItems: updateUser.cartItems,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = {
  authUser,
  getUserProfile,
  registerUser,
  getUserCart,
  updateUserCart,
  findUser,
};
