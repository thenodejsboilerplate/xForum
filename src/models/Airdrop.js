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
          author: { type: Schema.Types.ObjectId, ref: 'User' },
          symbol: {type: String, default: ''},
          projectName: { type: String, required: true},//,match: /[0-9a-zA-Z_-]/
          brief: {type: String, default: ''},
          detail: { type: String },

          like: {type: Number, default: 12500},
          initLike: {type: Number, default: 12500},
          //   email: {type: String},

          category: {type: [String]},

        //   airdropOpeningDate: {type: Number},
        //   airdropClosingDate: {type: Number},
          'airdropYear[]': {type: [String]},
          'airdropMonth[]': {type: [String]},
          'airdropDay[]': {type: [String]},

          totalSupply: String,
          inflation: {type: String},
          platform: String,
          

          
          reviews: { type: String },
          reputation: { type: String },

          airdropRequirement: {type: String},

          whitePaperAddress: String,
          whitePaperAddress_cn: String,

          website: {type: String},
          airdroppingAddress: {type: String},
          twitter: {type: String},
          facebook: {type: String},
          github: {type: String},
          blog: {type: String},
          facebook: {type: String},
          linkedin: {type: String},
          telegram: {type: String},
          slackChannel: {type: String}, 
          medium: {type: String},
          bitcointalkAddress: String,
          bounty: String,

          youtube: String,

          referralCode:  String,



          weeklyRecommend: {type: Boolean, default: false},
          checked: {type: Boolean, default: false}
}, {timestamps: true});



projectSchema.methods.time = time => {
    return moment(time).format('L');
};
projectSchema.methods.processProject = project =>{

    // to seconds
    // let airdropOpeningDate =  moment(`${project['airdropMonth[]'][0]} ${project['airdropDay[]'][0]}  ${project['airdropYear[]'][0]}`).valueOf();
    // let airdropClosingDate =  moment(`${project['airdropDay[]'][1]} ${project['airdropMonth[]'][1]} ${project['airdropYear[]'][1]}`).valueOf();

    //to formats like a day ago
    // let airdropOpeningDate = moment([project['airdropYear[]'][0], project['airdropMonth[]'][0],project['airdropDay[]'][0]]).fromNow();
    // let airdropClosingDate = moment([project['airdropYear[]'][1], project['airdropMonth[]'][1],project['airdropDay[]'][1]]).fromNow();    

    // console.log('airdropOpeningdate'+ airdropOpeningDate,    'airdropClosingdate'+ airdropClosingDate);
    return {
        _id:project._id,
        author: project.author,

        symbol: project.symbol,
        projectName: project.projectName,   
        brief: project.brief.slice(0, 30) + '...',   
        detail: project.detail,
        email: project.email,

        like: project.like,
        


        category: project.category,     
        // airdropOpeningDate: airdropOpeningDate,
        // airdropClosingDate: airdropClosingDate, 
       // 'airdropYear[]': project[''],

       airdropRequirement: project.airdropRequirement,
        
        
        whitePaperAddress: project.whitePaperAddress,
        whitePaperAddress_cn: project.whitePaperAddress_cn,
        totalSupply: project.totalSupply,
        inflation: project.inflation,
        downloadingAddress: project.downloadingAddress,
        reviews: project.reviews,
        reputation: project.reputation,

        website: project.website,
        airdroppingAddress: project.airdroppingAddress,
        twitter: project.twitter,
        facebook: project.facebook,
        github: project.github,
        blog: project.blog,
        linkedin: project.linkedin,
        telegram: project.telegram,
        medium: project.medium,
        slackChannel: project.slackChannel,
        reddit: project.reddit,
        discordChat: project.discordChat,
        bitcointalkAddress: project.bitcointalkAddress,
        referralCode: project.referralCode,

        bounty: project.bounty,

        youtube: project.youtube,


        weeklyRecommend: project.weeklyRecommend,
        checked: project.checked,
        

        created_at: project.time(project.createdAt),
        updated_at: project.time(project.updatedAt),     
    };
};




// make this available to our users in our Node applications
module.exports = mongoose.model('airdrop', projectSchema);