const { Timestamp } = require('bson')
const mongoose = require('mongoose')

// making structure
const urlSchema = new mongoose.Schema({
    shortId:{
        type: String,
        required: true,
        unique: true,
    },
    redirectURL : {
        type: String,
        required: true,
    },
    visitHistory: [
        {
          timestamp: { type: Number }, 
          _id: false,
        }
      ],
    },
    { timestamps: true }
);

const URL = mongoose.model('url', urlSchema);

module.exports = URL;