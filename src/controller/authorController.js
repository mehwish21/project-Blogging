const authorModel= require('../model/authorModel')

//{ fname: { mandatory}, lname: {mandatory}, title: {mandatory, enum[Mr, Mrs, Miss]}, email: {mandatory, valid email, unique}, password: {mandatory} }
const createAuthor=async function (req, res){
    try {
    const data= req.body;

    // if(!fname) return res.status(204).send({msg: "fname is requried"})
    // if(!lname) return res.status(204).send({msg: "lname is requried"})
    // if(!title) return res.status(204).send({msg: "title is requried"})
    // if(!email) return res.status(204).send({msg: "email is requried"})
    // if(!password) return res.status(204).send({msg: "password is requried"})

    const createAuthor= await authorModel.create(data);
    res.status(201).send({msg : createAuthor})
    }catch(err){
        console.log("This is the error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
    }
}

module.exports.createAuthor=createAuthor