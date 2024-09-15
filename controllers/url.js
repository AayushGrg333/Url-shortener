const ShortUniqueId = require('short-unique-id')
const URL = require('../models/url')


//generating short unique id
const uid = new ShortUniqueId({ length: 8 });


async function generateNewShortUrl(req,res) {
    try{
        const body = req.body;

        if(!body.url) return res.status(400).json({eror: "URL is required"})

        const shortId = uid.rnd();
        await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: []
        });

        return res.status(200).json({id: shortId,message: "Short URL created successfully"})

    }catch(error){
        console.error("Error creating short URL", error);
        res.status(500).json({message: "Internal sever error"})

    }   
}  

module.exports = {
    generateNewShortUrl,
}


