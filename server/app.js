import express from 'express';

// middleware
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import { Strategy as TwitterStrategy } from 'passport-twitter';

// application
import ids from 'server/ids';
import layout from 'server/layout';

// universal
import React from 'react';
import {renderToString} from 'react-dom/server';

import {unsubscribeAll} from 'universal/libs/micro-dispatcher';
import Store from 'universal/store';

import ApplicationContainer from 'universal/views/application-container';

import {startApplication} from 'universal/actions/application-action-creators';

const app = express();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // User.findById(id, (err, user) => {
  //   done(err, user);
  // });
  done(id);
});

passport.use(new TwitterStrategy(ids.twitter,
  (token, tokenSecret, profile, cb) => {
    return cb(profile);
  }
));

app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// auth
app.post('/login', passport.authenticate('local', {
  failureRedirect: '/login'
}), (req, res) => {
  res.redirect('/');
});
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', {
  failureRedirect: '/login',
}), (req, res) => {
  res.redirect('/');
});

// application
app.get('/*', (req, res) => {
  unsubscribeAll();

  const store = new Store();

  store.ready(() => {
    const content = renderToString(<ApplicationContainer store={store}/>);
    res.send(layout(content, store.getState()));
  });

  startApplication(req.path);
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
