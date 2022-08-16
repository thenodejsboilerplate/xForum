"use strict";
const express = require('express');
const router = express.Router();

const main = require('../../controllers/main');

/* GET home page. */
router.get('/', main.searchPage);

// router.get('/about', main.about);

module.exports = router;
