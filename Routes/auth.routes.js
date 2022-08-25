const router = require("express").Router();

const { register, login, info } = require("../Controllers/auth.controllers");

const { checkUser } = require("../Middlewares/auth.middleware");

router.post("/", checkUser);
router.post("/register", register);
router.post("/login", login);
router.get("/info/:id", info);


module.exports = router;
