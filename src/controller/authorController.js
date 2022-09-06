const { createIndexes } = require('../model/authorModel');
const authorModel = require('../model/authorModel')


// const validator = require('../Validation/validator')
//{ fname: { mandatory}, lname: {mandatory}, title: {mandatory, enum[Mr, Mrs, Miss]}, email: {mandatory, valid email, unique}, password: {mandatory} }
const createAuthor=async function (req, res){
    try {
    const data= req.body;
    //console.log(data)
    let body = Object.keys(data); //[fname,lname,title, email,,......]
    if(body.length==0) return res.status(400).send({msg:"Please provide some data"})

   const {fname,lname,title,email,password}=data;
   

        if(!fname) return res.send({msg :"fname is requried"})
        if(fname.trim().length == 0)return res.send({msg :"fname is empty"})
        if(!fname.match(/^[A-Za-z]+$/))return res.send({msg :"fname is not valid"})

        if(!lname)return res.send({msg :"lname is requried"})
        if(lname.trim().length == 0)return res.send({msg :"lname is empty"})
        if(!lname.match(/^[A-Za-z]+$/))return res.send({msg :"lname is not valid"})
        
        if(!title)return res.send({msg :"title is requried"})
        if(title.trim().length == 0)return res.send({msg :"title is empty"})
        //if(title != "Mr" || title !== "Mrs" || title !== "Miss")return res.send({msg :"use only Mr, Mrs, Miss"})

        if(!email)return res.send({msg :"email is requried"})
        if(email.trim().length == 0)return res.send({msg :"email is empty"})
        if(!email.match(/\S+@\S+\.\S+/))return res.send({msg :"email is not valid"})


        if(!password)return res.send({msg :"password is requried"})
        //if(typeof password == Number )return res.send({msg :"password not accpeted"})
        if(password.trim().length == 0) return res.send({msg :"password is empty"})          

                

        //const author= await authorModel.create(data)
        res.status(201).send({msg : "created", data : data})

    
    }catch(err){
        console.log("This is the error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
    }
}

module.exports.createAuthor=createAuthor

// if(isDeleted== false){
//     make it true and send empty response with status 200
// }
// if (blog not found){
//     send {
//         status: false,
//         msg: ""
//       } 
//       with status 404 
// }




// const a= "abc"
// const b=typeof (a)
// console.log(b)

// const createAuthor1 = async function (req, res) {
//     try {
//         const data = req.body;
//             if(data.fname==null || data.fname=="undefined"){
//                 return res.status(404).send({msg: "User info is must"})
//             }
            
           
//            if((typeof(data.fname)!=="String" && data.fname.trim().length ==0) || !data.fname.match(/^[A-Za-z]+$/) ){
//             return res.send("hi")
//            }

//         //    if( !data.fname.match(/^[A-Za-z]+$/) ){
//         //         return res.send("number not allowed")
//         //     }

//         // if ((data.fname != null || data.fname != undefined)) {
//         //     if (typeof (data.fname) === String) {
//         //         if (data.fname.match(/^[A-Za-z]+$/)) {
//         //             return res.status(404).send({ msg: "hello name is not valid" })
//         //         }

//         //     } else {
//         //         return res.status(404).send({ msg: "hi name is not valid" })
//         //     }

//         // } else {
//         //     return res.status(404).send({ msg: "User info is must" })
//         // }


//         if(data.lname==null || data.lname=="undefined"){
//             return res.status(404).send({msg: "last name is must"})
//         }
        
       
//        if((typeof(data.lname)!=="String" && data.lname.trim().length ==0) || !data.lname.match(/^[A-Za-z]+$/) ){
//         return res.send({msg :"last name is invalid"})
//        }


//     //    if(data.password==null || data.password=="undefined"){
//     //     return res.status(404).send({msg: " is must"})
//     // }

//     if(data.fname==null ){
//         return res.status(404).send({msg: "User info is must"})
//     }
    
   
//    if((typeof(data.password)!=="String" || data.password.trim().length !==0) ){
//     return res.send("hi")
//    }

        

//         // if (!data.tittle || typeof (data.tittle) != "String") {
//         //     return res.status(404).send({ msg: "tittle must be required" })
//         // }



//         if (data.title !== "Mr" && data.title !== "Mrs" && data.title !== "Miss") {
//             return res.status(404).send({ msg: "Tittle must be corrected" })
//         }

//         // 1
//         // if (!data.email || typeof (email) != "String") {
//         //     return res.status(404).send({ msg: "email must be required" })
//         // }
//         // 2 unique
//         // 3 valid


//         //let savedata= await authorModel.create(data);
//         res.status(201).send({ data });
//     } catch (err) {
//         res.status(500).send({ msg: err.massage })

//     }
// }

// module.exports.createAuthor1 = createAuthor1