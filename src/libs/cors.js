var express = require('express')
var cors = require('cors')
var app = express()
 
var whitelist = ['https://aywt3wreda.execute-api.eu-west-1.amazonaws.com', 'http://localhost:3000'];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

module.exports = {corsOptions, cors};