"use strict";
const User    = require('../models/User'),
      Post = require('../models/Post'),
      Tag = require('../models/Tag'),
      Comment = require('../models/Comment'),
      userProxy = require('../db_proxy/user'),
      moment = require('moment'),    
      asyncErrHandle = require('../common/asyncErrHandle'),
      logger = require('../libs/logger'),
      utility = require('../libs/utility');                              


module.exports = {

        saveSingle:   (req, res, post)=>{
        let post_id = post._id;
        let tags = req.body.tags;
        let tagsArray = tags.split(',');
        logger.info(`tagsArray in tags saving: ${JSON.stringify(tagsArray)}`);




        
        function insertTagId(_id){
            Post.findById(post._id, (err, post) => {
        
                Post.findOneAndUpdate({ '_id': post._id }, { $push: { 'tags': _id } }, { new: true }, (err, post) => {
                    if (err) {
                        console.log(err);
                        throw new Error(err);
                        //next(err);
                    } else {
                        //res.redirect('/post/show/'+ post.title);
                        console.log('findOneAndUpdate for tags array \'s post is' + post);
                        return;
                    }
                });
    
            });            
        }
        //let tagString = tag.name;
        tagsArray.forEach((v, i, a) => {
            //let count;
            logger.info('into tagsArray foreach function...')
               // logger.info('into tagsArray foreach function async function loop...');
               
                Tag.findOne({ name: v },function(err,atag){
                    //logger.info('utility.ObjectIsEmpty(atag): '+utility.ObjectIsEmpty(atag))
                    if (utility.ObjectIsEmpty(atag) == false) {  //already exist
                        Tag.findOneAndUpdate({ name: v }, { "$push": { posts: post._id },$inc: { 'count': 1 }} , {
                                new: true // set the new option to true to return the document after update was applied.
                            }, function(err, updatedTag){
                                if(err){
                                    logger.error(`error: ${err}`)
                                }
                                logger.info(`updatedTag: ${JSON.stringify(updatedTag)}`)
                            });
                            insertTagId(atag._id)
                        
                    } else {  //exist for the first time
                        let tag = new Tag();
                        tag.name = v;
                        tag.save(function(err,tag){
                            Tag.findOneAndUpdate({ name: v }, { "$push": { posts: post._id },$inc: { 'count': 1 }} , {
                                new: true // set the new option to true to return the document after update was applied.
                            }, function(err, updatedTag){
                                if(err){
                                    logger.error(`error: ${error}`)
                                }
                            });

                            insertTagId(tag._id)

                        });

                        
                    }
                
         

        

                    console.log('tag saved successfully');
                })

     
 
        }




       
       
       
       
        );



        


    },
};

