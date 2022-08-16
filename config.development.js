/**
 * config
 */
 'use strict'
 const path = require('path')
 const appDir =  path.resolve(__dirname)
 //path.dirname(`../${require.main.filename}`)
                 
 
 var childProcess = require('child_process')
 let hostname
 let dbUsername = process.env.dbUsername
 let dbPassword = process.env.dbPassword
 let mongoPort = process.env.MongoPort || 27099
 console.log(dbUsername, dbPassword, mongoPort)
 //dbUsername=frank  dbPassword=testgo  MongoPort = 55000 npm start

 childProcess.exec('hostname -f', function (err, stdout, stderr) {
   if (err) {
     console.log(err)
   }
   hostname = stdout.trim()
 })
 
 var config = {
   // debug 为 true 时，用于本地调试
   debug: true,
   env: 'product',
   yearlyCharge: 588,
   trialCharge: 99,
   contractVipYear: 8, // month long
   host: hostname,
 
   uploadDir: path.join(appDir, 'src/public/upload/'),
 
   // mongodb 配置
   db: {
     mongo: {
       port: mongoPort,
       uri: `mongodb://localhost:${mongoPort}/test`, // ?authSource=groupForum
       options: {
         user: dbUsername || '',
         pass: dbPassword || 'test',
         db: { reconnectTries: Number.MAX_VALUE },
         server: {
           poolSize: 5
         }
       }
     },
     redis: {
         // redis config, default to the localhost
       'host': '127.0.0.1',
       'port': '6379',
       'username': 'default',
       'db': 0,
       'pw': '',
       'ttl': 1000 * 60 * 60 * 24 * 30
     }
   },
 
   session_secret: 'my', // 务必修改
   auth_cookie_name: 'node',
 
   // 程序运行的端口
   port: process.env.PORT || 88999,
 
   // 话题列表显示的话题数量
   list_topic_count: 3,
 
   // 邮箱配置
   mail_opts: {
     host: "smtp.sina.com",//'smtp.ym.163.com',
     port: 465,//587,
     secure: true,
     auth: {
       user: 'frank',
       pass: 'frank'
     }
   },
 
   // admin 可删除话题，编辑标签。把 user_login_name 换成你的登录名
   admins: { frank: true },
 
   // 是否允许直接注册（否则只能走 github 的方式）
   allow_sign_up: true,
 
   // oneapm 是个用来监控网站性能的服务
   oneapm_key: '',
 
   file_limit: '5MB',
 
   // 版块
   categories: [
     {'key': 'Ethereum', 'value': 'Ethereum'},
     {'key': 'Biance', 'value': 'Biance'},
     {'key': 'Matic', 'value': 'Matic'}
   ],
   // // 版块
   // tabs: [
   //   ['share', '分享'],
   //   ['ask', '问答'],
   //   ['job', '招聘']
   // ],
 
   create_post_per_day: 1000, // 每个用户一天可以发的主题数
   create_reply_per_day: 1000, // 每个用户一天可以发的评论数
   visit_per_day: 1000 // 每个 ip 每天能访问的次数
 }
 
 if (process.env.NODE_ENV === 'test') {
   config.db = 'mongodb://127.0.0.1/db_name_test'
 }
 
 module.exports = config
 