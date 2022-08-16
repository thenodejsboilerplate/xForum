//./models/Post.js
// grab the things we need
"use strict";
const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      User = require('../models/User'),
      moment = require('moment');

// create a schema
//The allowed SchemaTypes are:
// String
// Number
// Date
// Buffer
// Boolean
// Mixed
// ObjectId
// Array
var projectSchema = new Schema({
          contract: { type: Schema.Types.ObjectId, ref: 'User' },
          symbol: {type: String, default: ''},
          projectName: { type: String, required: true},//,match: /[0-9a-zA-Z_-]/
          brief: {type: String, default: ''},
          detail: { type: String },
          category: {type: [String], required: true},
          scamLevel:{type: String, default: 'info'},
          url: { type: String },

          whitePaperAddress: String,
          whitePaperAddress_cn: String,
          totalSupply: String,
          inflation: {type: String},
          platform: String,


          downloadingAddress: {type: String},
          reviews: { type: String },
          reputation: { type: String },

          //like: {type: Number, default: 8500},
          likeProject: {type: Number, default: 12500},
          

          weeklyRecommend: {type: Boolean, default: false},
          checked: {type: Boolean, default: false}
}, {timestamps: true});



projectSchema.methods.time = time => {
    return moment(time).format('L');
};
projectSchema.methods.processProject = project =>{
    return {
        _id:project._id,
        author: project.author,
        symbol: project.symbol,
        projectName: project.projectName,   
        brief: project.brief.slice(0, 30) + '...',   
        detail: project.detail,
        url: project.url,

        category: project.category,    
        scamLevel: project.scamLevel,
        isPrimary: project.scamLevel == 'primary' ?  true : false,
        isDanger: project.scamLevel == 'danger' ?  true : false,
        isWarning: project.scamLevel == 'warning' ?  true : false,


        whitePaperAddress: project.whitePaperAddress,
        whitePaperAddress_cn: project.whitePaperAddress_cn,
        totalSupply: project.totalSupply,
        inflation: project.inflation,
        downloadingAddress: project.downloadingAddress,
        reviews: project.reviews,
        reputation: project.reputation,
        weeklyRecommend: project.weeklyRecommend,

        likeProject: project.likeProject,

        created_at: project.time(project.createdAt),
        updated_at: project.time(project.updatedAt),     
    };
};




// make this available to our users in our Node applications
module.exports = mongoose.model('project', projectSchema);