const User = require('../models/user');

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


// create user
const createUser = async (req, res) => {
  const { username, password, firstName, lastName, telephone } = req.body;
  try {
    const user = await User.create({
      username,
      password,
      firstName,
      lastName,
      telephone,
      email
    });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const signUp = async (req, res) => {
  const { username, password, firstName, lastName, telephone } = req.body;
  try {
    const user = await User.create({
      username,
      password,
      firstName,
      lastName,
      telephone
    });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const signIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        username: username,
        password: password
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
  createUser,
  updateUser,
  deleteUser
};