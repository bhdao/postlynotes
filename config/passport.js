const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const thing = require('../models/User')
console.log(thing, "help");

module.exports = function (passport) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
    async (accessToken, refreshToken, profile, done) => {
      const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        image: profile.photos[0].value
      }


      console.log(profile);

      try {
        console.log(thing)
        console.log(thing.methods)
        console.log(thing.firstName);
        let user = await thing.findOne({ googleId: profile.id })
        if (user) {
          done(null, user)
        } else {
          user = await thing.create(newUser)
          done(null, user)
        }
      } catch (err) {
        console.log(err)
      }
    }));

  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function (id, done) {
    thing.findById(id, function (err, user) {
      done(err, user)
    })
  })
}