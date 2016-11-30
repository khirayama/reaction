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
app
  .use(express.static('public'))
  .use(useragent.express())
  .use(cookieParser())
  .use(bodyParser.urlencoded({extended: true}))
  .use(bodyParser.json())
  .use(session({
    keys: ['secret-key'],
    name: '_reaction_session',
  }))
  .use(setupPassport())
  .use(passport.initialize())
  .use(passport.session());

// routing
app.use('/auth', authRouter);
app.get('/dashboard', authorize, applicationHandler);
app.get('/*', applicationHandler);

// server
app.listen(3000, () => {
  console.log('listening on port 3000');
});
