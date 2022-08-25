const router = require("express").Router();
const { register, login  } = require("../Controllers/auth.controllers");
const { checkUser,info } = require("../Middlewares/auth.middleware");

router.post("/", checkUser);
router.post("/register", register);
router.post("/login", login);
router.get("/info/:id", info);


module.exports = router;
