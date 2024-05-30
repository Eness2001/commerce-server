const Address = require("../models/Address");
const { sendResponseError } = require("../middleware/middleware");
const { default: mongoose } = require("mongoose");

// === ADD ADDRESS ===
const addAddress = async (req, res) => {
  const { addressTitle, name, surname, tcNo, address, phoneNo } = req.body;

  try {
    // Find user's addresses
    let userAddress = await Address.findOne({ userId: req.user._id });

    if (!userAddress) {
      // If there are no addresses, create a new one
      userAddress = new Address({
        userId: req.user._id,
        addresses: [
          {
            addressTitle: addressTitle,
            name: name,
            surname: surname,
            tcNo: tcNo,
            address: address,
            phoneNo: phoneNo,
          },
        ],
      });

      await userAddress.save();
      return res
        .status(200)
        .send({ status: "OK", addresses: userAddress.addresses });
    } else {
      // If user has existing addresses, add a new one
      userAddress.addresses.push({
        addressTitle: addressTitle,
        name: name,
        surname: surname,
        tcNo: tcNo,
        address: address,
        phoneNo: phoneNo,
      });

      await userAddress.save();
      return res
        .status(200)
        .send({ status: "OK", addresses: userAddress.addresses });
    }
  } catch (error) {
    console.log(error);
    sendResponseError(500, `=== ERROR ADDING ADDRESS ${error} ===`, res);
  }
};

// === GET ADDRESS ===
const getAddress = async (req, res) => {
  try {
    const address = await Address.find({ userId: req.user._id });
    console.log(address);
    return res.status(200).send({ status: "OK", addresses: address });
  } catch (error) {
    sendResponseError(500, `=== ERROR GETING ADDRESS ${error} ===`, res);
  }
};

// === DELETE ADDRESS ===
const deleteAddress = async (req, res) => {
    const  addressId  = req.params.id;
  
    try {
      // Find user's addresses
      let userAddress = await Address.findOne({ userId: req.user._id });
  
      if (!userAddress) {
        return res.status(404).send({ status: "ERROR", message: "Addresses not found." });
      }
  
      // Find the index of the address with the specified ID
      const addressIndex = userAddress.addresses.findIndex(address => address._id.toString() === addressId);
  
      if (addressIndex === -1) {
        return res.status(404).send({ status: "ERROR", message: "Address not found." });
      }
  
      // Remove the address from the addresses array
      userAddress.addresses.splice(addressIndex, 1);
  
      // Save the updated userAddress
      await userAddress.save();
  
      return res.status(200).send({ status: "OK", message: "Address deleted successfully.", addresses: userAddress.addresses });
    } catch (error) {
      console.error(error);
      sendResponseError(500, `=== ERROR DELETING ADDRESS ${error} ===`, res);
    }
  };
  
  module.exports = {
    deleteAddress,
  };
module.exports = {
  addAddress,
  getAddress,
  deleteAddress
};
