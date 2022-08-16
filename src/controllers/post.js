"use strict";
let moment = require('moment'),
    Post = require('../models/Post'),
    User = require('../models/User'),
    Comment = require('../models/Comment'),
    Tag = require('../models/Tag'),
    postProxy = require('../db_proxy/post'),
    tagProxy = require('../db_proxy/tag'),
    logger = require('../libs/logger'),
    asyncErrHandle = require('../common/asyncErrHandle');

    let mongoose = require('mongoose');
module.exports = {
      postArticle: async (req,res)=>{

           const user = req.user,
                 title = req.body.title,
                 content = req.body.content,
                // tags = req.body.tags,
                 category = req.body.category,
                 intro = req.body.intro;
           const post = new Post();
           post.author = user._id;
           post.user_id = user._id;
           post.title = title;
           post.content = content;
           post.intro = intro;


           //post.tags = req.body.tags;
           //Post.tags = tags.split(',');
           post.category = category;




            // let tags = req.body.tags;
            // let tagsArray = tags.split(',');
            // tagsArray.forEach(function(v,i,a){

            // });
           post.save((err,post)=>{
                 if(err){
                       logger.error('post save error: ' +  err);
                       req.flash('error',`there is some errors when save the post ${err}`);
                       res.redirect('back');
                  }else{
                       //new tag and save post
                       tagProxy.saveSingle(req,res,post);

                       logger.info(`your post saved successfully: ${post._id}`);
                       req.flash('success','Your post saved successfully');
                       res.redirect('/post/show/' + post.title);
                 }
           });
      
      },

      makeArticle: (req,res)=>{
            res.render('form/post', {
                  user: req.user.processUser(req.user),
                  messages: {
                        error: req.flash('error'),
                        success: req.flash('success'),
                        info: req.flash('info'),
                  },                  

            });
      },

      getPersonalPosts: (req,res)=>{
                  const user_id = req.params.user_id;                                  
                  postProxy.getPostsByUserId(req,res,user_id,'post/personalPosts');
                                  
                 
       },

       showPost: (req,res)=>{
             const title = req.params.title;
             console.log('title is '+title);
             postProxy.getPostByTitle(req,res,title,'post/showOne');      
       },

      //  getAllPosts: function(req,res){

      //  },

      getPostEdit:  async function (req, res) {
           const post_id = req.params.post_id;
           let [err,post] = await asyncErrHandle(Post.findOne({'_id': post_id}).populate('tags')) ;
            //console.log('tags: '+typeof(post.processPost(post).tags) +JSON.stringify(post.processPost(post).tags) );
          // console.log(`post.processPost(post)-original:${JSON.stringify(post) }`)

            let tags = post.tags;//an array of objectId which could be populated
           // console.log(`after populated post.tags:${JSON.stringify(post.tags) }`)
            let tagsArray = [];

          //  Post.findOne({_id: post_id}).polulate('tags','author').exec(function(err, apost){
                 
                  tags.forEach(e => {
                        tagsArray.push(e.name);  
                  });
 

                  res.render('form/editPost', {
                        user: req.user ? req.user.processUser(req.user) : req.user,
                        post: post.processPost(post),
                        tagArrayString: tagsArray,
                        messages: {
                              error: req.flash('error'),
                              success: req.flash('success'),
                              info: req.flash('info'),
                        },                  
      
                  });

          //  });


            // tags.forEach(function(v,i,a){
            //      const apost =  Post.findOne({_id: post_id}).polulate('tags');
            //      tagsObectArray = apost.tags;
            //      tagsObectArray.

            //       // let tag = Tag.findById(v).catch(function(err){
            //       //       if(err){
            //       //       console.log(err);
            //       //       req.flash('error',`error in find id by tag for ${post_id}'s tag`);
            //       //       res.redirect('back'); 
            //       //       }
            //       // })
            //       tagsArray.push(tag.name);
            // });


      },


      editPost: (req,res)=>{

          const  post_id = req.params.post_id,
                 title = req.body.title,                
                 tags = req.body.tags,
                 category = req.body.category,
                 intro = req.body.intro,
                 content = req.body.content;


            const options = {
                  //author: user.local.username;
                  //user_id: user._id;
                  title: title,
                  content: content,
                  intro: intro,
                  //tags: req.body.tags,
                  //Post.tags = tags.split(',');
                  category: category,
            };
            
            //new: bool - if true, return the modified document rather than the original. defaults to false (changed in 4.0)
            //Finds a matching document, updates it according to the update arg, passing any options, and returns the found document (if any) to the callback. The query executes immediately if callback is passed else a Query object is returned.
            //Model.findOneAndUpdate([conditions], [update], [options], [callback])
            //http://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate
            Post.findOneAndUpdate({'_id': post_id}, {$set: options}, {new: true},function(err, post) {
                  if(err){
                        console.log(err);
                        next(err);
                  }else{
                         
                         res.redirect('/post/show/'+ post.title);
 
                  }
            });            




     },

     deletePost: (req,res)=>{
           const post_id = req.params.post_id;
            Post.remove({ '_id': post_id }, (err)=>{
                  if(err){
                        console.log(`there is an error when removing the post : ${err}`);
                        req.flash('error','删除文章错误！');
                        res.redirect('back');
                  }else{
                        console.log(`The post with id of ${req.params.post_id} deleted successfully `);
                        req.flash('success','文章已删除!');
                        res.redirect('back');
                  }
            });

     },

     comment: (req,res)=>{
           const content = req.body.content,
                 title = req.body.title,
                 user = req.user.processUser(req.user),
                 author = user.username,
                 user_id = user._id;
         console.log(`title is : ${title}`);
          Post.findOne({'title':title}, (err,post)=>{
                 if(err){
                       console.log(err);
                       req.flash('error',`there is some errors when finding the post by its title ${err}`);
                       res.redirect('back');                       
                 }else{
                        const post_id = post._id; 
                        
                        const comment = new Comment();
                        comment.content = content;
                        comment.author = author;
                        comment.user_id = user_id;
                        comment.post_id = post_id;

                        comment.save(err=>{
                              if(err){
                                    console.log(err);
                                    req.flash('error',`there is some errors when save the post ${err}`);
                                    res.redirect('back');                       
                              }else{
                                    console.log('comment saved successfully');
                                    req.flash('success','comment saved successfully');
                                    res.redirect('back');
                              }

                        });                       

                 }              
          });

            

     },

     getTagsPost: (req,res)=>{
                const tag_id = req.params.tag_id;
                const page = req.query.p ? parseInt(req.query.p) : 1;
                //let loginedUser;
                console.log('entering into the tagpost');

                //查询并返回第 page 页的 10 篇文章
                postProxy.getTen(tag_id, page, (err, posts, count)=> {
                    if (err) {
                    console.log('some error with getting the 10 posts:'+ err);
                    //next(err);
                    posts = [];
                    } 
                    // if(req.user){
                    //     loginedUser = req.user.processUser(req.user);
                    // }
                    //userProxy.getUserById(user_id, theuser=>{
                    console.log('tag posts for'+ tag_id +posts);
                    
                    res.render('post/tagPosts', {
                            title: 'specific tag page',
                            user: req.user ? req.user.processUser(req.user) : req.user,
                            //postUser: req.user ? (req.user._id == user_id ? loginedUser : theuser) : theuser,
                            posts: posts,
                            page: page,
                            isFirstPage: (page - 1) == 0,
                            isLastPage: ((page - 1) * 10 + posts.length) == count,
                            messages: {
                                error: req.flash('error'),
                                success: req.flash('success'),
                                info: req.flash('info'),
                            }, // get the user out of session and pass to template
                    }); 


                },'exist_tag_id');	           

     },

     getSearch: function(req,res){
            const page = req.query.p ? parseInt(req.query.p) : 1;
            //let loginedUser;
            console.log('entering into the serarchPost');           
            let keyword;
            if(req.query.keyword){
                keyword = req.query.keyword;
            }
           
           pattern = new RegExp(keyword, "i");
           console.log('keyword search for'+ keyword);
           postProxy.getTen(pattern, page, (err, posts, count)=> {
                    if (err) {
                        console.log('some error with getting the 10 posts for search page:'+ err);
                        posts = [];
                    } 
                    res.render('post/tagPosts', {
                            title: 'specific pages',
                            user: req.user ? req.user.processUser(req.user) : req.user,
                            //postUser: req.user ? (req.user._id == user_id ? loginedUser : theuser) : theuser,
                            posts: posts,
                            keyword: keyword,
                            page: page,
                            isFirstPage: (page - 1) == 0,
                            isLastPage: ((page - 1) * 10 + posts.length) == count,
                            messages: {
                                error: req.flash('error'),
                                success: req.flash('success'),
                                info: req.flash('info'),
                            }, // get the user out of session and pass to template
                    });                 
           },undefined,'exits_title',undefined);

     },






}