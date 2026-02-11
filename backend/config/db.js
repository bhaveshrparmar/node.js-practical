const { default: mongoose } = require("mongoose");

exports.dbConfig = mongoose.connect(process.env.MONGO_URL)

    .then(() => {
        console.log("connect MongoDB")
    })
    .catch((err) => {
        console.log(`err : ${err}`)
    })