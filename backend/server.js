const express = require('express')
const app = express()
require("dotenv").config()
const cors = require("cors")
const cookieParser = require("cookie-parser")
const port = process.env.PORT || 5000

require("./config/db")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5175",
    credentials: true
}))

app.get("/", (req, res) => {
    res.json({ message: "Recipe Sharing API is running" })
})

const authRoute = require("./routes/user.route")
const recipeRoute = require("./routes/recipe.route")
const commentRoute = require("./routes/comment.route")

app.use("/api/auth", authRoute)
app.use("/api/recipes", recipeRoute)
app.use("/api/comments", commentRoute)

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})