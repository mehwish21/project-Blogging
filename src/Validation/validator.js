//---------------------------------------importing mongoose--------------------------------------------

const mongoose = require('mongoose');

//----------------------------------------Validation Functionss--------------------------------------

const isValid = function (value) {
    if (typeof value === 'undefined' || value == null) return false;
    return true;
}

const isNotEmpty = function (value) {
    if (value.trim().length != 0) return true;
    return false;
}

const isWrong = function (value) {
    if (value.match(/^[A-Za-z]+$/)) return true;
    return false;
}

const emaiValid=function(value){
    if(value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) )return true 
    return false
}

const validObjectId=function(value){
    if(mongoose.Types.ObjectId.isValid(value))return true
    return false    
}

const isString=function(value){
    if(typeof value==="string")
    return true
    return false
}
const typeValid=function(value){
    if(typeof value==="object") return true
    return false
}

const keysLength=function(value){
    if(Object.values(value).length != 0) return true
    return false
}

const passValid=function(value){
    if(value.match(/^[a-zA-Z0-9!@#$%^&*]{8,15}$/))
    return true
    return false
}

const validBoolean= function (value){
    if(typeof value === "boolean") return true
    return false
}


// const validArray=function(value){
//     for(let i=0;i<value;i++){
//         if(typeof value[i]==="string")return true
//         return false
        
//     }}

// const notEmptyArray= function(value){
//         for(let i=0;i<value;i++){
//             if(value[i].trim().length == 0)return true
//             return false
//         }}
    

//------------------------------ exporting all the functions here------------------------------------

module.exports = { isValid, isNotEmpty, isWrong,emaiValid,validObjectId,isString, typeValid,keysLength, passValid, validBoolean};


