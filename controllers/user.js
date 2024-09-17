const User = require('../models/user');
const {getUser,setUser} = require('../service/auth')
const {v4 : uuidv4 } = require('uuid');


async function handleUserSignup(req,res) {
    const {name, email, password} = req.body;
    await User.create({
        name,
        email,
        password
    });
    return res.redirect('/')

}
async function handleUserLogin(req,res) {
    const {email, password} = req.body;
    const user =await User.findOne({email, password});
    if(!user){ 
        return res.render("login",{
        error: "Invalid Username or Password"
        })
    }

    const sessionId = uuidv4()
    setUser(sessionId,user)
    res.cookie('uid', sessionId)//saved a cookie named uid after login
    return res.redirect('/')

}

module.exports = {
    handleUserSignup,
    handleUserLogin,
}