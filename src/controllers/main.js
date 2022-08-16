"use strict";
const  User = require('../models/User'),
      util = require('../libs/utility'),
      projectProxy = require('../db_proxy/dir'),
      //coHandle = require('../common/coHandler');
    //   postProxy = require('../db_proxy/post'),
    //   userProxy = require('../db_proxy/user');
    // Post = require('../models/Post'),
    asyncErrHandle = require('../common/asyncErrHandle'),
    Project = require('../models/Project');
const seo = require('../config/seo');
module.exports = {
    searchPage: function (req,res) {
            let user = req.user;
            let isAdmin = false;
            if(user){
                user = user.processUser(user);
                isAdmin = user.admin;
            }
            res.render('scam/search', {
              seo: {
                "title": seo.search.title,
                "keywords": seo.search.keywords,
                "description": seo.search.description,
              },
              user: user,
              messages: {
                    error: req.flash('error'),
                    success: req.flash('success'),
                    info: req.flash('info'),
              }                
            });
    },
    home: async (req,res) => {
                let user = req.user;
                let isAdmin = false;
                if(user){
                    user = user.processUser(user);
                    isAdmin = user.admin;
                }
                let [err,projects] = await asyncErrHandle(Project.find({checked: true}).populate('author').exec());


                projectProxy.modifyProjects(projects, function(arr){
                    res.render('home/home', {
                        seo: {
                            title: seo.home.title,
                            keywords: seo.home.keywords,
                            description: seo.home.description,
                        },

                        projects:arr,
                        

                        user: req.user ? req.user.processUser(req.user) : req.user,
                        isAdmin: isAdmin,
                        messages: {
                            error: req.flash('error'),
                            success: req.flash('success'),
                            info: req.flash('info'),
                        }, // get the user out of session and pass to template
                    }); //render 
                })

                console.log(`projects: ${JSON.stringify(projects)}`);


        }

}

