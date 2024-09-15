const express = require('express');
const router = express.Router();

const {generateNewShortUrl,handleGetAnalytics} = require('../controllers/url')


// post redirecting url
router.post('/',generateNewShortUrl)

router.get('/analytics/:shortId',handleGetAnalytics)


module.exports = router;