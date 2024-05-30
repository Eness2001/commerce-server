const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const { checkPassword, newToken } = require("../utils/utility");
const { sendResponseError } = require("../middleware/middleware");

// === SIGN UP ===
const signUpAdmin = async (req, res) => {
  const { name, surname, email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 8);
    const admin = await Admin.create({
      ...req.body,
      password: hash,
      role: "ADMİN",
    });
    res.status(201).send({ status: "===ADMİN CREATED SUCCESFULLY===", admin });
  } catch (error) {
    sendResponseError(400, "===ADMİN NOT CREATED===", res);
    console.log("===ERROR=== : ", error);
  }
};

// ===SIGN IN===
const signInAdmin = async (req, res) => {
  const { email, password } = req.body;
  //console.log(req.body);

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      sendResponseError(404, "=== admin NOT FOUND ===", res);
    }

    const same = await checkPassword(password, admin.password);
    if (same) {
      let token = newToken(admin);
      res.status(200).send({ status: 200, token, admin });
      return;
    }
    sendResponseError(400, "=== INVALID PASSWORD ===", res);
  } catch (error) {
    console.log("===ERROR=== : ", error);
    sendResponseError(500, `===ERROR === ${error}`, res);
  }
};

module.exports = {
  signUpAdmin,
  signInAdmin,
};
