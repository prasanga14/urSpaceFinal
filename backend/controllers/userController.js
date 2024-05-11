import mongoose from 'mongoose';
import User from '../models/users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).send(allUsers);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const { id } = req.params;
    const requiredUser = await User.findById(id);
    res.status(200).send({ requiredUser });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message, json: 'empty' });
  }
};

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      throw new Error('All fields are required');
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res.status(400).send('User already exists with these credentials');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    return res
      .status(200)
      .send({ message: 'Account created Successfully', user: savedUser });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  res.send('update user response');
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const requiredUser = await User.findByIdAndDelete(id);
    res.status(200).send({ msg: 'Account Deleted successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error('Both fields are required');
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('User does not exist');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Email or password is not matching');
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '30d',
      }
    );
    return res
      .status(200)
      .send({ token, id: user._id, username: user.username });
  } catch (error) {
    console.log(error.message);
    return res.status(400).send({ message: error.message });
  }
};

const sendFriendRequest = async (req, res) => {
  try {
  } catch (error) {
    console.log(error.message);
  }
};

export {
  getAllUsers,
  getSingle,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  sendFriendRequest,
};
