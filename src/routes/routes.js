// app/frontend.js
"use strict";
const user = require('./front/user'),
      // test = require('./frontend/test'),
	//   respond = require('./frontend/respond'),
	//   login3 = require('./frontend/login3'),
	 index = require('./front/index'),
	 dir = require('./front/dir'),
	//   airdrop = require('./frontend/airdrop'),
	//   backendSetting = require('./backend/setting');
	  // api = require('./frontend/api'),
	  scam = require('./front/scam'),
	  post = require('./front/post');

// const User = require('../models/User');
// const passport = require('passport');

module.exports   = function(app, passport, User) {
	 app.use('/',index);  
	//  app.use('/response',respond);   
	 app.use('/user',user(app,User,passport));
	 app.use('/post', post);
	//  app.use('/auth',login3);
	 app.use('/project', dir);
	 app.use('/scam', scam);
	//  app.use('/airdrop', airdrop);

    //  app.use('/admin', backendSetting);
};
