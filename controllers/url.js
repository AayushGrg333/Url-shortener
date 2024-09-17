const ShortUniqueId = require('short-unique-id')
const URL = require('../models/url')


//generating short unique id
const uid = new ShortUniqueId({ length: 8 });


async function generateNewShortUrl(req,res) {
    try{
        const body = req.body;

        if(!body.url) return res.status(400).json({eror: "URL is required"})

        const shortId = uid.rnd();

        //create DB in mongo
        await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: [],
        createdBy:req.user._id,
        });

        return res.render('home',{id: shortId})

    }catch(error){
        console.error("Error creating short URL", error);
        res.status(500).json({message: "Internal sever error"})

    }   
}  

async function handleGetAnalytics(req,res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId })
    return res.json({
        totalclicks : result.visitHistory.length,
        analytics: result.visitHistory
    })
}

module.exports = {
    generateNewShortUrl,
    handleGetAnalytics
}


