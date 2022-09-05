const authorModel= require('../model/authorModel')

const createAuthor=async function (req, res){
    try {
    const data= req.body;
    const createAuthor= await authorModel.create(data);
    res.status(201).send({msg : createAuthor})
    }catch(err){
        console.log("This is the error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
    }
}

module.exports.createAuthor=createAuthor