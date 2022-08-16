"use strict";
let moment = require('moment'),
    Project = require('../models/Project'),
    ErrorExist = require('../models/ErrorExist'),
    User = require('../models/User');
//const marked = require('marked');
const asyncErrHandle = require('../common/asyncErrHandle');
const seo = require('../config/seo');
const config = require('../common/get-config');
const tools = require('../libs/utility');
const projectProxy = require('../db_proxy/dir');

module.exports = {
     square: async(req, res) => {
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
                    title: seo.square.title,
                    keywords: seo.square.keywords,
                    description: seo.square.description,
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
     },
     submit: async (req,res) => {
        let categories = config.categories;
        
            let [err,weeklyRec] = await  asyncErrHandle(Project.findOne({weeklyRecommend: true}).exec());
            res.render('form/singleProject', {
                user: req.user ? req.user.processUser(req.user) : '',
                categories: categories,
                data:{weeklyRec},
                seo: {
                    title: seo.postProject.title,
                    keywords: seo.postProject.keywords,
                    description: seo.postProject.description,
                },
                messages: {
                      error: req.flash('error'),
                      success: req.flash('success'),
                      info: req.flash('info'),
                }
            });  
    

      },

      post: async (req, res) => {
          let user = req.user ? req.user.processUser(req.user) : '';
          let body = req.body;
          
          let project = new Project(body);
          if(user){
              project.author = user._id;   
          }
          
        
             asyncErrHandle(project.save());
              res.redirect('/project/detail?id=' + project._id);
      },

      detail: async (req, res) => {

        let id = req.query.id;
        let author;
        let user = req.user || '';
 
       let [err, project] = await asyncErrHandle(Project.findOne({_id: id}).populate('author'));
        console.log(`project: ${JSON.stringify(project)}`);

        let symbol = project.symbol;
        console.log('symbol' + symbol);

        //if the author liked(click) the project
        let likeArray = false;
        let like = false

        if(user){
            likeArray = user.local.likeProject;
            like = tools.inArray(likeArray, symbol); 

            console.log(`likeArray ${likeArray}, like ${like}, symbol: ${symbol}`);
        }
        console.log(`like is ${like}`);
        console.log(`project.projectNmae ${project.projectName}`);

        res.render('dir/detail', {
        user: user ? user.processUser(user) : '',
        project:project.processProject(project),
        like: like,
        seo: {
            title: project.projectName + ' | ' + seo.detail.title,
            keywords: `${project.projectName},${project.projectName + ' 项目详情'}`,
            description: `${project.brief}`,
        },
        messages: {
                error: req.flash('error'),
                success: req.flash('success'),
                info: req.flash('info'),
        }
        });


      },

      existError: (req, res) => {
          let id = req.query.id;
          let project,author;
          let user = req.user;
      
             project = asyncErrHandle(Project.findOne({_id: id}).populate('author').exec());
             let weeklyRec = asyncErrHandle(Project.findOne({weeklyRecommend: true}).exec());
             // console.log(`project: ${project}`);
             res.render('dir/existError', {
              user: user ? user.processUser(user) : '',
              project: project,
              data: {
                weeklyRec
              },
              seo: {
                  title: project.projectName + ' | ' + seo.detail.title,
                  keywords: `${project.projectName},${project.projectName + ' 错误信息反馈'}`,
                  description: `${project.projectName} 错误信息反馈`,
              },
              messages: {
                    error: req.flash('error'),
                    success: req.flash('success'),
                    info: req.flash('info'),
              }
             });
     
      },

      postExistError: (req, res) => {
        let user = req.user ? req.user.processUser(req.user) : '';
        let body = req.body;
        
        let existError = new ErrorExist(body);
        if(user){
            existError.author = user._id;   
        }
        
        asyncErrHandle( existError.save());
            res.redirect('/dir/detail?id=' + body.project_id);
      },


      like: function (req, res){
        let id = req.query.id;
        let user = req.user;
               
               //setting like times
               var conditions = { '_id': id },
               update = { $inc: { 'likeProject': 1 }};//increment
               let newProject =asyncErrHandle( Project.findOneAndUpdate(conditions, update).exec()); 
               
               //setting user's like
               user.local.likeProject.push(newProject.symbol);
               asyncErrHandle(user.save());
   
               return res.redirect('back');
               
   
   
   },



      


    
}