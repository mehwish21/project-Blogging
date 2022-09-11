//---------------------------------------importing modules--------------------------------------------

const mongoose = require("mongoose")

//----------------------------------------Creating Schema---------------------------------------------

const authorSchema = new mongoose.Schema({


    fname: { type: String, required: true },
    lname: { type: String, required: true },
    title: {
        type: String,
        enum: ["Mr", "Mrs", "Miss"],
        required: true
    },

    email: {
        type: String,
        required : true,
        unique : true
       },
    password: {
        type: String,
       
    }
},{timestamps : true})

// exporting all the model here
module.exports = mongoose.model('Author', authorSchema)

