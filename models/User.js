// ./models/User.js
'use strict';
const mongoose = require('mongoose'),
  bcrypt = require('bcrypt'),
  moment = require('moment'),
  helper = require('../libs/utility'),
     // logger = require('./logger'),
  Schema = mongoose.Schema;

// create a schema
// The allowed SchemaTypes are:
// String
// Number
// Date
// Buffer
// Boolean
// Mixed
// ObjectId
// Array
var userSchema = new Schema({
  local: {
      username: { type: String, required: true, unique: true },
      email: { type: String, required: true, unique: true,min: 4 },
      password: { type: String, required: true },//,match: /[0-9a-zA-Z_-]/

      active: {type:Boolean, required: true, default: true },
      logo: {type: String},
      //Properties resetPasswordToken and resetPassword are not part of the above document, because they are set only after password reset is submitted. And since we haven’t specified default values, those properties will not be set when creating a new user.
      resetPasswordToken: String,
      resetPasswordExpires: Date,
      roles:[String],
      admin: {type: Boolean, default: false},

      like: [String],
      likeProject: [String],

      neVip: {type: Boolean, default:false},
      myGroups: [String],

      likeChannel: [String],
  }
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}, usePushEach: true});

// methods ======================

// generating a hash
userSchema.methods.generateHash = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
// checking if password is valid

// in arrow-functions , the 'this'' value of the following statement is : window; // or the global object
// as to arrow function inside a function,  it's the this of the outer function
// arrow function expressions are best suited for non-method functions.
userSchema.methods.validPassword = function password(password) {
  return bcrypt.compareSync(password, this.local.password);
};

userSchema.methods.time = time => {
  return moment(time).format('L');
};

userSchema.methods.processUser = user => {

   /**process the roles */
   let roles = user.local.roles;
   let latestRole;
   let vip = false;

   if(helper.inArray(roles,'Super')){
       latestRole = 'Super Admin';
   }else if(helper.inArray(roles,'Junior')){
       latestRole = 'Junior Admin';
   }else if(helper.inArray(roles,'Yearly')){
       latestRole = 'Yearly';
   }else if(helper.inArray(roles,'Trial')){
       latestRole = 'Trial';
   }else{
       latestRole = 'Nope';
   }

   if(latestRole!=='Nope'){
       vip = true;
   } 


  return {
        _id: user._id,
        username: user.local.username,
        email: user.local.email,
        logo: user.local.logo,
        roles: user.local.roles,
        admin: user.local.admin,
        active: user.local.active,   
        
        like: user.local.like,
        likeProject: user.local.likeProject,
        
        neVip: user.local.neVip,
        myGroups: user.local.myGroups,
        latestRole: latestRole,
        vip: vip,

        likeChannel: user.local.likeChannel,

        created_at: moment(user.local.created_at).format('L'),
        updated_at: moment(user.local.updated_at).format('L')

  };
};



// the schema is useless so far
// we need to create a model using it

// make this available to our users in our Node applications
module.exports = mongoose.model('User', userSchema);
