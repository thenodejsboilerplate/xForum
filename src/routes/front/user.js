"use strict";
const express = require('express'),
      router = express.Router(),
      user = require('../../controllers/user'),
      auth = require('../../middlewares/auth');

module.exports = function(app,User,passport){
        // router.get('/reset/:token', user.getResetToken);
        // router.post('/reset/:token', user.postResetToken);


        router.get('/signup',auth.notLoggedIn, user.signup);
        router.get('/login',auth.notLoggedIn, user.login);
       // router.get('/fileupload',auth.isLoggedIn, user.fileupload);
        // we will want this protected so you have to be logged in to visit
        // we will use route middleware to verify this (the isLoggedIn function)
        router.get('/profile/:user_id', user.profile);
        // router.get('/updateUser', auth.isLoggedIn, user.updateUser);
        // router.get('/forgotPassword', auth.notLoggedIn, user.forgotPassword);
       
        // router.get('/logout', auth.isLoggedIn, user.logout);	

        // router.post('/postForgotPassword', user.postForgotPassword(User));
        // router.post('/updateUser',auth.isLoggedIn, user.putUpdateUser(User));        
        router.post('/postSignup', user.postSignup(passport));        
        router.post('/postLogin', user.postLogin(passport));
        //router.post("/process/:year/:month", user.postFileUpload(app));        
        return router;
}
