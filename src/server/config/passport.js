import passport from 'passport';
import {Strategy as TwitterStrategy} from 'passport-twitter';

const config = {
  twitter: {
    consumerKey: process.env.TWITTER_KEY,
    consumerSecret: process.env.TWITTER_SECRET,
    callbackURL: 'http://localhost:3000/auth/twitter/callback',
  },
};

export function setup() {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((userId, done) => {
    done(null, userId);
  });

  passport.use(new TwitterStrategy(config.twitter,
    (token, tokenSecret, profile, done) => {
      done(null, profile);
    }
  ));
}
