const mongoose = require('mongoose')
const url =  "mongodb://127.0.0.1:27017/short-url"

// connection
async function connectMongoDB() {
    try{
        const connection = await mongoose.connect(url);
        console.log("MongoDB connected")
    }catch(error){
        console.error("Cannot connet MongoDB", error)
    }
}

module.exports = connectMongoDB;