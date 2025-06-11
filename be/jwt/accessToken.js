
const {Strategy} = require("passport-jwt")
const {ExtractJwt} = require("passport-jwt")

const passport = require("passport")

const User = require("../models/User")

require("dotenv").config()

const opt = {
  
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),

   secretOrKey : process.env.JWT_ACCESS_KEY
}  

passport.use(
  "jwt",
  new Strategy(opt, async function (jwt_payload, done) {
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

