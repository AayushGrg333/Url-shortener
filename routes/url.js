const express = require('express');
const router = express.Router();

const {generateNewShortUrl} = require('../controllers/url')


// post redirecting url
router.post('/',generateNewShortUrl)

module.exports = router;