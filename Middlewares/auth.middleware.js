const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "ty hb entegrenity com", async (err, decodedToken) => {
      if (err) {
        res.json({ status: false });
        next();
      } else {
        const user = await User.findById(decodedToken.id);
        if (user) {
          res.json({
            status: true,
            id: user._id,
            // user: user.email,
            // name: user.name,
            // surname: user.surname,
            // merchantID: user.merchantID,
            // ApiKey: decodeApiKey.id,
            // ApiSecret: decodeApiSecret.id,
            // ApiKey: user.ApiKey,
            // ApiSecret: user.ApiSecret,
          });
        } else res.json({ status: false });
        next();
      }
    });
  } else {
    res.json({ status: false });
    next();
  }
};

