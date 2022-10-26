const express =require('express')
const app= express()
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');

app.use(express.json())


mongoose.connect("mongodb+srv://Akhilesh12168:FZeWCA6RSCVaAqQK@cluster0.enuzw59.mongodb.net/group6?retryWrites=true&w=majority"
, {
    useNewUrlParser: true

}).then(() =>{console.log("Mongodb is connected")})
.catch(err => console.log(err))



app.use('/', route); 



app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});