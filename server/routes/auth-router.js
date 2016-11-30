import {Router} from 'express';
import passport from 'passport';

const router = new Router();

router.get('/:provider', (req, res) => {
  const provider = req.params.provider;
  const authenticate = passport.authenticate(provider);

  authenticate(req, res);
});

router.get('/:provider/callback', (req, res) => {
  const provider = req.params.provider;
  const authenticate = passport.authenticate(provider, {
    successRedirect: '/dashboard',
    failureRedirect: '/',
  });

  authenticate(req, res);
});

export default router;
