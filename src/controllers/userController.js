const User = require('../models/user');
const {Sequelize} = require('sequelize');
const database = require('../config/database.js');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isemail = require("isemail");
const UserAddress = require('../models/userAddress');

// get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


// get user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Create a user (member)
const signUp = async (req, res) => {
  console.log("body", req.body);
  if (!isemail.validate(req.body.email)) {
    return res.status(406).json({ message: 'Veuillez saisir un mail valide !', severity: 'error' });
  }

  // Check if the email entered by the user already exists
  const user = await User.findOne({ where: { email: req.body.email } });
  if (user) {
    return res.status(409).json({ message: 'Email was already used, please use another email address.', severity: 'error' });
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    });
    
    // Create a userAddress for the new user
    const newUserAddress = await UserAddress.create({
      userID: newUser.idUser,
    });

    res.status(201).json({ newUser, newUserAddress, message: 'Registration complete', severity: 'success' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error creating user', severity: 'error' });
  }
};


const signIn = async (req, res) => {
  const { email, password } = req.body;
  console.log("body", req.body)
  try {
    const user = await User.findOne({
      where: {
        email: email,
      }
    });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    console.log("User " + user + " is connected");
    const token = jwt.sign({ idUser: user.idUser }, process.env.JWT_SECRET, { expiresIn: '24h' });
    console.log("ok1")
    res.status(200).json({ token: token });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// update user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, password, firstName, lastName, telephone } = req.body;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.username = username;
    user.password = password;
    user.firstName = firstName;
    user.lastName = lastName;
    user.telephone = telephone;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const setAdmin = async (req, res) => {
  try {
    const sender = await User.findByPk(req.auth.userId);
    const senderAdminLevel = sender.admin_level;
    const mailAddress = req.body.mail_address;
    const user = await User.findByPk(mailAddress);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (senderAdminLevel < 1 || user.admin_level === 2) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await user.update({ admin_level: 1 });
    return res.status(200).json({ message: 'User is now admin' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

const unsetAdmin = async (req, res) => {
  try {
    const sender = await User.findByPk(req.auth.userId);
    const senderAdminLevel = sender.admin_level;
    const mailAddress = req.body.mail_address;
    const user = await User.findByPk(mailAddress);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (senderAdminLevel < 1 || user.admin_level === 2) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await user.update({ admin_level: 0 });
    return res.status(200).json({ message: 'User is no longer admin' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};


// delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.destroy();
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  signUp,
  signIn,
  setAdmin,
  unsetAdmin,
};