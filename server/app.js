import express from 'express';

import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'cookie-session';
import passport from 'passport';
import useragent from 'express-useragent';

import {setup as setupPassport, authorize} from 'server/passport-config';
import {applicationHandler} from 'server/handlers';
import authRouter from 'server/routes/auth-router';

const app = express();

// middleware
app.use(express.static('public'));
app.use(useragent.express());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
  keys: ['secret-key'],
  name: '_reaction_session',
}));
app.use(setupPassport());
app.use(passport.initialize());
app.use(passport.session());

// routing
app.use('/auth', authRouter);
app.get('/dashboard', authorize, applicationHandler);
app.get('/*', applicationHandler);

// server
app.listen(3000, () => {
  console.log('listening on port 3000');
});
