import passport from 'passport';

export function authHandler(req, res) {
  const provider = req.params.provider;
  const authenticate = passport.authenticate(provider);

  authenticate(req, res);
}

export function authCallbackHandler(req, res) {
  const provider = req.params.provider;
  const authenticate = passport.authenticate(provider, {
    successRedirect: '/',
    failureRedirect: '/',
  });

  authenticate(req, res);
}

export function logoutHandler(req, res) {
  req.logout();
  res.redirect('/');
}
