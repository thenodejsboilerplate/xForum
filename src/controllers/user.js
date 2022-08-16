"use strict";

const flash        = require('connect-flash'),
    config  = require('../common/get-config'),
    mailService  = require('../libs/mail')(config),
    asyncWrapper = require('../common/asyncErrHandle'),
    seo = require('../config/seo'),
    postProxy = require('../db_proxy/post'),
    User = require("../models/User"),
    logger =  require('../libs/logger');

module.exports = {
    signup: (req,res)=>{
        //render the page and pass in any flash data if it exists, req.flash is provided by connect-flash
        req.user = '';//????
           
            res.render('form/signup', { 
                seo: {
                    title: seo.signup.title,
                    keywords: seo.signup.keywords,
                    description: seo.signup.description,
                },
                data: {
                   // weeklyRec
                },
                messages: {
                    error: req.flash('error'),
                    success: req.flash('success'),
                    info: req.flash('info'),
                }, 
                user: req.user ? req.user.processUser(req.user) : req.user,
            });



    },

    login: (req,res)=>{
        //render the page and pass in any flash data if it exists
           // let weeklyRec = yield Project.findOne({weeklyRecommend: true}).exec();
           //req.user = req.user ? req.user : null;
            res.render('form/login', { 
                seo: {
                    title: seo.login.title,
                    keywords: seo.login.keywords,
                    description: seo.login.description,
                },
                data: {
                    //weeklyRec
                },
                messages: {
                    error: req.flash('error'),
                    success: req.flash('success'),
                    info: req.flash('info'),
                }, 
                user: ''//req.user ? req.user.processUser(req.user) : req.user,
            });


    },

    profile: (req, res)=> {
        const user_id = req.params.user_id;
        User.findOne({id: user_id},function(err, user){
            if(err){
                logger.error('Error getting the user'+ err).
                res.redirect('back')
            }
            if(user){
                postProxy.getPostsByUserId(req,res,user_id,'users/profile');
            }else{
                res.redirect('back')
            }
        })

        // User.findById(user_id).exec((err,user)=>{
        //     if(err){
        //         console.log(`cannot catch user,error: ${err}`);
        //         req.flash('error',`error in find user for ${user_id}`);
        //         res.redirect('back');							
        //     }else{
        //         console.log(user);
        //         let modifiedUser = user.processUser(user);
        //         console.log(modifiedUser);
                
        //         res.render('users/profile',{
        //             postUser: modifiedUser
        //         });

        //   }
        // });



    },



    postSignup: passport=>{
        
        return function(req, res, next) {

            // User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
            //     if (err) {
            //         return res.render('/user/signup');
            //     }
        
            //     passport.authenticate('local')(req, res, function () {
            //         res.redirect('/');
            //     });
            // });
             passport.authenticate('local-signup', (err, user, info)=> {
               if (err) { 
                   logger.error('error:' + err.stack)
                   return next(err); 

                }else{
                           if (!user) {
                               //req.flash('error', 'No such user exists'); 
                               return res.redirect('/user/signup'); 
                           }else{
                                   req.logIn(user, err=> {
                                           if (err) { return next(err); }
                                           res.render('email/signupMessage',
                                                   {layout:null, user:user}, (err,html)=>{
                                                       if(err){console.log('err in email template', err);}
                                                       try{
                                                           mailService.send(user.local.email,'Thanks for your trust!',html);
                                                       }catch(ex){
                                                           mailService.mailError('The email widget broke down!', __filename,ex);
                                                       }
                                                       
                                                   }

                                           );
                                           req.flash('success','You login successfully and welcome to your dashboard!');
                                           return res.redirect('/user/profile/'+ user._id);

                                   });
                           }

               }

               

             })(req, res, next);
        };

   },

   postLogin: function(passport){

       return function(req,res,next){
               passport.authenticate('local-login', (err, user, info)=>{
                       if (err) { 
                           logger.error(`post login error: ${err.stack}`)
                           return next(err); 
                        }
                       if (!user) { 
                           req.flash('error','Something wrong with the Password or email!')
                           return res.redirect('/user/login'); 
                       }
                       req.logIn(user, function(err) {
                           if (err) { return next(err); }
                           req.flash('success','Login successfully!')
                           return res.redirect('/user/profile/'+user._id);
                       });        		
               })(req, res, next);
       };
    },





}