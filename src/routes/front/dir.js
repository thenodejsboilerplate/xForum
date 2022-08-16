"use strict";
const express = require('express'),
      router = express.Router(),
      auth = require('../../middlewares/auth'),
      dir = require('../../controllers/dir');

router.get('/square', auth.isLoggedIn, dir.square)
router.get('/submit', auth.isLoggedIn, dir.submit);
router.post('/post', auth.isLoggedIn, dir.post);


// router.get('/show/:title', post.showPost);
router.get('/detail', dir.detail);
router.get('/report', auth.isLoggedIn,  dir.existError);
router.post('/existError', auth.isLoggedIn,  dir.postExistError);

router.get('/like',auth.isLoggedIn, dir.like);

module.exports = router;