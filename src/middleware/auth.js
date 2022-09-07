
const jwt=require("jsonwebtoken");

const authentication= function(req,res,next){
    let token=req.headers["x-api-key"];
 
    if(!token) return res.send({status:false,msg:"token must be present"});

    let decodedToken=jwt.verify(token,"Project-1 Blogging-group-6");
    if(!decodedToken)
    return res.send({status:false,msg:"Invalid Token"})
   next();
 }

 module.exports.authentication=authentication;


