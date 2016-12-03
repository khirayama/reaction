import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'cookie-session';
import passport from 'passport';
import useragent from 'express-useragent';

import {setup as setupPassport} from 'server/config/passport';
import router from 'server/config/routes';

const app = express();

setupPassport();

// middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(useragent.express());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
  keys: ['secret-key'],
  name: '_reaction_session',
}));
app.use((req, res, next) => {
  // priority: query - setting - cookie - default
  const locale = req.query.lang || req.cookies._reaction_locale || req.locale;

  req.getLocale = () => locale;
  res.cookie('_reaction_locale', locale);
  next();
});

// passport
app.use(passport.initialize());
app.use(passport.session());

// router
app.use(router);

app.listen(3000, () => {
  console.log('listening on port 3000');
});
