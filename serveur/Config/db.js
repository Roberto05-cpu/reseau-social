const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("BD connectee" .white.bgGreen)
    } catch (error) {
        console.log("Bd non connecte", error, colors.bgRed .white)
    }
}

module.exports = {connectDB}