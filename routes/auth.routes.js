const router = require("express").Router();
const { signupUser } = require("../controllers/auth/signup");
const { loginUser } = require("../controllers/auth/login");

router.post("/signup", signupUser);
router.post("/login", loginUser);

module.exports = router;
