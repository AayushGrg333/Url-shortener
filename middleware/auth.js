const  {getUser} = require('../service/auth')



async function restrctToLoggedinUserOnly(req,res,next) {
    const userUid = await req.cookies.uid;
    if(!userUid) return res.redirect('/login');//if uid doesn't exists redirect login

    const user = await getUser(userUid);//gets the data from the uid name,email,password
    if(!user) return res.redirect("/login");

    req.user = user;
    next();
}

async function checkAuth(req,res,next) {
    const userUid = await req.cookies.uid;

    const user = await getUser(userUid);//gets the data from the uid name,email,password

    req.user = user;
    next();
}

module.exports = {
    restrctToLoggedinUserOnly,
    checkAuth
}