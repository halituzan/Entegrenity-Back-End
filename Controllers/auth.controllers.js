const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, "ty hb entegrenity com", {
    expiresIn: maxAge,
  });
};

const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.message === "incorrect email")
    errors.email = "Epostanız kayıtlı değil veya şifreniz yanlış";

  if (err.message === "incorrect password")
    errors.email = "Epostanız kayıtlı değil veya şifreniz yanlış";

  if (err.code === 11000) {
    if (Object.keys(err.keyValue)[0] === "phone") {
      errors.email = "Bu telefon adresi daha önce kullanılmış.";
      return errors;
    }
    if (Object.keys(err.keyValue)[0] === "email") {
      errors.email = "Bu eposta ile zaten kayıt olunmuş";
      return errors;
    }
  }

  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

module.exports.register = async (req, res, next) => {
  try {
    const { email, password, phone, name, surname, userRole, groups } =
      req.body;
    const user = await User.create({
      email,
      password,
      phone,
      name,
      surname,
      userRole,
      groups,
    });
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      withCredintials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });
    res.status(201).json({ user: user._id, created: true });
  } catch (error) {
    const errors = handleErrors(error);
    res.json({ errors, created: false });
  }
};

module.exports.login = async (req, res, next) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);
    const token = createToken(user._id);
    console.log(token);
    res.cookie("jwt", token, {
      withCredintials: true,
      secure:true,
      httpOnly: true,
      maxAge: maxAge * 1000,
      SameSite: none,
    });
    res.status(200).json({ user: user._id, created: true });
  } catch (error) {
    console.log(error);
    const errors = handleErrors(error);
    res.json({ errors, created: false });
  }
};
