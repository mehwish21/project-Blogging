
const isValid = function (value) {
    if (typeof value === 'undefined' || value == null) return false;
    return true;
}

// const isNotEmpty = function (value) {
//     if (typeof value === String && value.trim().length === 0) return false;
//     return true;
// }

// const isWrong = function (value) {
//     if (value.match(/^[A-Za-z]+$/)) return true;
//     return false;
// }

// module.exports = { isValid, isNotEmpty, isWrong };

// // let a= "akhielsh"
// // if(!a.match(/^[A-Za-z]+$/)){
// //     return console.log(false)
// // }else{
// // return console.log(true)
// // }
