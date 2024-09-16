const express = require("express");
const app = express();
const PORT = 8001;
const connectMongoDB = require("./config/db");
const URL = require("./models/url");
const path = require('path');
const staticRoute = require('./routes/staticRouter')

const urlRoute = require("./routes/url");

//connect mongoDB
connectMongoDB();

// ejs setup
app.set('view engine',"ejs")
app.set('views',path.resolve("./views"))

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//SSR
app.use("/",staticRoute);


// path
app.use("/url", urlRoute);
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
