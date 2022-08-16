'use strict'
const config = require('../../src/common/get-config')
const mongodb = config.db.mongo
const mongoose = require('mongoose')
const logger = require('./logger')
const env = process.env.NODE_ENV || 'develop';
// mongoose.connect(mongodb.uri, mongodb.options, function (err) {
//   if (err) {
//     console.error(`mongodb error : ${err.message ? err.message : err.stack}`)
//     process.exit(0)
//   }
// })
// if(env == "develop"){
//   mongoose.connect(`mongodb://localhost:27018/test`, function (err) {
//     if (err) {
//       logger.error(`develop: Mongoose default connection error: ${err.stack}`)
//       process.exit(0)
//     }
//     logger.info('Congratulations!  Mongodb connected.[mongoose.connect..]')
//   })
// }else{
  mongoose.connect(`mongodb://${mongodb.options.user}:${mongodb.options.pass}@localhost:${mongodb.port}/dir`, function (err) {
    if (err) {
      logger.error(`Mongoose default connection error: ${err.stack}`)
      process.exit(0)
    }
    
  })
//}


// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  logger.info('Congratulations!  Mongodb connected.')
})

// If the connection throws an error
// mongoose.connection.on('error',function (err) {
//   console.log('Mongoose default connection error: ' + err);
// });

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  logger.error('Mongoose default connection disconnected')
})

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    logger.info('Mongoose default connection disconnected through app termination')
    process.exit(0)
  })
})
