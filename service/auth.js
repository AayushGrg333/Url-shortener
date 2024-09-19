const jwt = require('jsonwebtoken');
const secretkey = "verySecure"

function setUser(user){
    const payload = {...user};
    return jwt.sign(payload,secretkey);
}

function getUser(token){
    if(!token) return null;
    try{
        return jwt.verify(token, secretkey); 
    }catch(error){
        return null;
    }
}

module.exports = {
    setUser,
    getUser
}