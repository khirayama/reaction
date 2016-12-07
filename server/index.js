const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('cookie-session');
const passport = require('passport');
const useragent = require('express-useragent');

const i18n = require('universal/locales');

const setupPassport = require('server/config/passport').setup;
const router = require('server/config/routes');

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
  const locale = req.query.lang || req.cookies._reaction_locale || req.locale || i18n.defaultLocale;

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
