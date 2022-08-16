"use strict";
const express = require('express'),
      router = express.Router(),
      auth = require('../../middlewares/auth'),
      scam = require('../../controllers/scam');
    
//let {corsOptions, cors} = require('../../libs/cors');

//router.get('/search', scam.searchSinglePage);      
router.get('/result',  scam.searchShow);
router.post('/searchPost', scam.searchPost);

module.exports = router;