// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

  'githubAuth': {
    'clientID': '', // your App ID
    'clientSecret': 'dfdf', // your App Secret
    'callbackURL': '/auth/github/callback'
  },

  'googleAuth': {
    'clientID': 'fgf9hv7.apps.googleusercontent.com',
    'clientSecret': 'otw5yd',
    'callbackURL': '/auth/google/callback'
  }

};
