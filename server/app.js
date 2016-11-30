import express from 'express';

import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import {Strategy as TwitterStrategy} from 'passport-twitter';

import passportConfig from 'server/passport-config';
import {applicationHandler} from 'server/handlers';

const app = express();

// passport config
const authorize = (req, res, next) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
};

passport.serializeUser((user, done) => {
  console.log('serializeUser');
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  console.log('deserializeUser');
  done(null, userId);
});

passport.use(new TwitterStrategy(passportConfig.twitter,
  (token, tokenSecret, profile, done) => {
    done(null, profile);
  }
));

// middleware
app
  .use(express.static('public'))
  .use(cookieParser())
  .use(bodyParser.urlencoded({extended: true}))
  .use(bodyParser.json())
  .use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    name: '_reaction_session',
    cookie: {secure: false},
  }))
  .use(passport.initialize())
  .use(passport.session());

// application
app
  .get('/auth/twitter', passport.authenticate('twitter'))
  .get('/auth/twitter/callback', passport.authenticate('twitter', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
  }))
  .get('/dashboard', authorize, applicationHandler)
  .get('/*', applicationHandler);

// server
app.listen(3000, () => {
  console.log('listening on port 3000');
});
