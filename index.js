const express = require("express");
const app = express();
const PORT = 8001;
const connectMongoDB = require("./config/db");
const URL = require("./models/url");

const urlRoute = require("./routes/url");

//connect mongoDB
connectMongoDB();

// middleware
app.use(express.json());

// path
app.use("/url", urlRoute);
app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {shortId},
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                }
            },
        }
    );
    res.redirect(entry.redirectURL)
});

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
