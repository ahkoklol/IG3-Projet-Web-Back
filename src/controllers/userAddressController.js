const UserAddress = require("../models/userAddress");

// create user address
exports.createUserAddress = async (req, res) => {
  const { userID, descriptionaddressLine1, city, postalCode, country, telephone, mobile } = req.body;
  try {
    const newUserAddress = await UserAddress.create({
      userID: userID,
      descriptionaddressLine1: descriptionaddressLine1,
      city: city,
      postalCode: postalCode,
      country: country,
      telephone: telephone,
      mobile: mobile,
    });
    res.status(201).json(newUserAddress);
  } catch (error) {
    res.status(400).json({ error: "Cannot create user address" });
  }
};


// get user address by ID
exports.getUserAddressById = async (req, res) => {
  const { id } = req.params;
  try {
    const userAddress = await UserAddress.findByPk(id);
    res.json(userAddress);
  } catch (error) {
    res.status(404).json({ error: "User address not found" });
  }
};


// get user addresses by userID
exports.getUserAddressesByUserId = async (req, res) => {
  const { userID } = req.params;
  try {
    const userAddresses = await UserAddress.findAll({
      where: {
        userID: userID,
      },
    });
    res.json(userAddresses);
  } catch (error) {
    res.status(404).json({ error: "User addresses not found" });
  }
};


// update user address by ID
exports.updateUserAddressById = async (req, res) => {
  const { id, userID, descriptionaddressLine1, descriptionaddressLine2, city, postalCode, country, telephone, mobile } = req.body;
  try {
    const userAddress = await UserAddress.findByPk(id);
    if (!userAddress) {
      return res.status(404).json({ error: 'User address not found' });
    }
    userAddress.userID = userID;
    userAddress.descriptionaddressLine1 = descriptionaddressLine1;
    //userAddress.descriptionaddressLine2 = descriptionaddressLine2;
    userAddress.city = city;
    userAddress.postalCode = postalCode;
    userAddress.country = country;
    userAddress.telephone = telephone;
    userAddress.mobile = mobile;
    await userAddress.save();
    res.status(201).json(userAddress);
  } catch (error) {
    res.status(400).json({ error: "Cannot update user address" });
  }
};


// delete user address by ID
exports.deleteUserAddressById = async (req, res) => {
  const { id } = req.body;
  try {
    await UserAddress.destroy({
      where: {
        id: id,
      },
    });
    res.status(201).json({ message: "User address deleted" });
  } catch (error) {
    res.status(400).json({ error: "Cannot delete user address" });
  }
};