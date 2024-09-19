const User = require('../models/user');
const {getUser,setUser} = require('../service/auth')


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

    const  token = setUser(user)
    res.cookie('uid', token)//saved a cookie named uid after login
    return res.redirect('/')

}

module.exports = {
    handleUserSignup,
    handleUserLogin,
}