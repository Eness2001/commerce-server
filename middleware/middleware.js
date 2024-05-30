const User = require("../models/User");
const { verifyToken } = require("../utils/utility");
// === ERROR RESPONSE ===
const sendResponseError = (statusCode, errorMessage, res) => {
   res.status(statusCode).json({
    success: false,
    error: errorMessage,
  });
};

// === VERİFY USER ===
const verifyUser = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);
  if (!authorization) {
    sendResponseError(400, "===YOU ARE NOT AUTHORIZED", res);
    return;
  } else if (!authorization.startsWith("Bearer ")) {
    sendResponseError(400, "=== YOU ARE NOT AUTHORIZED===", res);
    return;
  }

  try {
    const payload = await verifyToken(authorization.split(" ")[1]);
    console.log(payload);

    if (payload) {
      const user = await User.findById(payload.id);
      console.log(user);
      req["user"] = user;
      next();
    } else {
      sendResponseError(400, "YOU ARE NOT AUTHORİZED", res);
    }
  } catch (error) {
    console.log("===ERROR===", error);
    sendResponseError(400, `=== ERROR===${error}`, res);
  }
};


module.exports = { sendResponseError, verifyUser };
