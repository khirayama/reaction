const passport = require('passport');

function authHandler(req, res) {
  const provider = req.params.provider;
  const authenticate = passport.authenticate(provider);

  authenticate(req, res);
}

function authCallbackHandler(req, res) {
  const provider = req.params.provider;
  const authenticate = passport.authenticate(provider, {
    successRedirect: '/',
    failureRedirect: '/',
  });

  authenticate(req, res);
}

function logoutHandler(req, res) {
  req.logout();
  res.redirect('/');
}

module.exports = {
  authHandler,
  authCallbackHandler,
  logoutHandler,
}
