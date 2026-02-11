const { register, login, logout, getCurrentUser } = require("../controller/user.controller")
const { verifyAuth } = require("../middleware/verify")

const router = require("express").Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.get("/me", verifyAuth, getCurrentUser)

module.exports = router