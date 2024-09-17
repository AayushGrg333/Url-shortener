const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 8001;
const connectMongoDB = require("./config/db");
const URL = require("./models/url");
const path = require('path');
const {restrctToLoggedinUserOnly, checkAuth} = require('./middleware/auth')




const urlRoute = require("./routes/url");
const staticRoute = require('./routes/staticRouter')
const userRoute = require('./routes/user')

//connect mongoDB
connectMongoDB();

// ejs setup
app.set('view engine',"ejs")
app.set('views',path.resolve("./views"))


// middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

//SSR
app.use("/",checkAuth,staticRoute);//raw html
app.use('/user',userRoute);//this is for login and signup


// path
app.use("/url",restrctToLoggedinUserOnly,urlRoute);
app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {shortId},
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                }
            },
        },
    );
    res.redirect(entry.redirectURL)
});

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
