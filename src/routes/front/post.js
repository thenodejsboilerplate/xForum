"use strict";
const express = require('express'),
      router = express.Router(),
      auth = require('../../middlewares/auth'),
      post = require('../../controllers/post'),
      image_upload = require('../../libs/image-upload');


router.get('/make', auth.isLoggedIn, post.makeArticle);
router.post('/post', auth.isLoggedIn, post.postArticle);
router.get('/search', post.getSearch);

router.get('/:user_id',post.getPersonalPosts);
router.get('/show/:title', post.showPost);
router.get('/edit/:post_id', auth.isLoggedIn, post.getPostEdit);
router.post('/edit/:post_id', auth.isLoggedIn,   post.editPost);
router.get('/delete/:post_id', auth.isLoggedIn, post.deletePost);
router.post('/comment', auth.isLoggedIn,post.comment );
router.get('/tag/:tag_id', post.getTagsPost);

router.post('/upload/image', auth.isLoggedIn, image_upload.PostImageUpload);


module.exports = router;






// router.get('/modify/:post_id', post.getModify);
// router.post('/modify/:post_id', post.postModify);
// router.post('/delete/:post_id', post.delete);