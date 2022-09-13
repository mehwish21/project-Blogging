//--------------------importing modules--------------------
const authorModel = require('../model/authorModel')
const jwt = require("jsonwebtoken");
const { isNotEmpty, isWrong, emaiValid, keysLength, isString, passValid } = require('../Validation/validator')


//-----------------------------author creation post/authors------------------------------------
const createAuthor = async function (req, res) {
    try {
        const data = req.body;
        if (!keysLength(data)) return res.status(400).send({ status :false, msg: "Please provide some data" })

        let { fname, lname, title, email, password } = data;

        // fname validation
        if (!fname) return res.send({status :false, msg: "fname is requried" })
        if (!isNotEmpty(fname)) return res.status(400).send({status :false, msg: "fname is empty" })
        data.fname = fname.trim()
        if (!isWrong(data.fname)) return res.status(400).send({status :false, msg: "fname is not valid" })

        // lname validation
        if (!lname) return res.status(400).send({ status :false,msg: "lname is requried" })
        if (!isNotEmpty(lname)) return res.status(400).send({status :false, msg: "lname is empty" })
        data.lname = lname.trim()
        if (!isWrong(data.lname)) return res.status(400).send({status :false, msg: "lname is not valid" })

        // title validation
        if (!title) return res.status(400).send({status :false, msg: "title is requried" })
        if (!isNotEmpty(title)) return res.status(400).send({status :false, msg: "title is empty" })
        data.title = title.trim()
        let arr = ["Mr", "Mrs", "Miss"]
        if (!arr.includes(data.title)) return res.status(400).send({status :false, msg: "use only Mr, Mrs, Miss" })

        // email validation
        if (!email) return res.status(400).send({status :false,  msg: "email is requried" })
        if (!isNotEmpty(email)) return res.status(400).send({status :false, msg: "email is empty" })
        data.email = email.trim()
        if (!emaiValid(data.email)) return res.status(400).send({status :false, msg: "email is not valid" })
        const sameEmail = await authorModel.find({email : {$in: email}})
        if(sameEmail.length !== 0) return res.status(400).send({status :false, msg: "Email is Already Registered" })


        // password validation
        if (!password) return res.status(400).send({status :false, msg: "password is requried" })
        if (!isString(password)) return res.status(400).send({status :false, msg: "password not accpeted" })
        if (!isNotEmpty(password)) return res.status(400).send({status :false, msg: "password is empty" })
        data.password = password.trim()
        if (!passValid(data.password)) return res.status(400).send({status :false, msg: "Please enter a valid password" })


        // author creation
        const author = await authorModel.create(data)
        res.status(201).send({status :true, msg: "created", data: author })


    } catch (err) {
        console.log("This is the error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
    }
}

//------------------------POST /login--------------------------------------------

const authorLogin = async function (req, res) {
    let data = req.body;
    const { email, password } = data

    if (!keysLength(data)) return res.status(400).send({ status: false, msg: "Data is required" })

    if (!email) return res.status(400).send({ status: false, msg: "Email is required" })

    if (!password) return res.status(400).send({ status: false, msg: "password is required" })

    let loggedInAuthor = await authorModel.findOne({ email: email, password: password });

    if (!loggedInAuthor) return res.status(403).send({ status: false, msg: "Invalid Credentials" });

    // token creation
    let token = jwt.sign(
        {
            userId: loggedInAuthor._id.toString(),
            batch: "Project-1",
            organisation: "Blogging site",
            iat : Math.floor(Date.now() / 1000),
            exp : Math.floor(Date.now() / 1000) +60*60
        },
        "Project-1 Blogging-group-6"
    );
    res.setHeader("x-auth-token", token);
    res.status(200).send({ status: true, data: { token: token } });

}


// exporting the function
module.exports = { createAuthor, authorLogin }