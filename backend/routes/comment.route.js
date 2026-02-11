const { addComment, getComments, deleteComment } = require("../controller/comment.controller")
const { verifyAuth } = require("../middleware/verify")

const router = require("express").Router()

router.post("/", verifyAuth, addComment)
router.get("/:recipeId", getComments)
router.delete("/:id", verifyAuth, deleteComment)

module.exports = router