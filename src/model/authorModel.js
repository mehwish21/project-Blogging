const mongoose = require("mongoose")
require('mongoose-type-email');

const authorSchema = new mongoose.Schema({


    fname: { type: String, required: true },
    lname: { type: String, required: true },
    title: {
        type: String,
        enum: ["Mr", "Mrs", "Miss"],
        required: true
    },

    email: {
        type: mongoose.SchemaTypes.Email,
        required : true,
        unique : true
       },
    password: {
        type: String,
       
    }
},{timestamps : true})

module.exports = mongoose.model('Author', authorSchema)

