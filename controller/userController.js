const User = require("../models/User");
const bcrypt = require("bcrypt");
const { checkPassword, newToken } = require("../utils/utility");
const { sendResponseError } = require("../middleware/middleware");

// === SIGN UP ===
const signUpUser = async (req, res) => {
  const { name, surname, email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 8);
    const user = await User.create({
      ...req.body,
      password: hash,
      role:"USER"
    });
    res.status(201).send({ status: "===USER CREATED SUCCESFULLY===", user });
  } catch (error) {
    sendResponseError(400, "===USER NOT CREATED===", res);
    console.log("===ERROR=== : ", error);
  }
};

// ===SIGN IN===
const signInUser = async (req, res) => {
  const { email, password } = req.body;
  //console.log(req.body);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      sendResponseError(404, "=== USER NOT FOUND ===", res);
    }

    const same = await checkPassword(password, user.password);
    if (same) {
      let token = newToken(user);
      res.status(200).send({ status: 200, token, user });
      return;
    }
    sendResponseError(400, "=== INVALID PASSWORD ===", res);
  } catch (error) {
    console.log("===ERROR=== : ", error);
    sendResponseError(500, `===ERROR === ${error}`, res);
  }
};

// GET USER

const getUser = async (req, res) => {
  res.status(200).send({ user: req.user });
};

module.exports = { signUpUser, signInUser, getUser };
