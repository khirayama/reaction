import {Router} from 'express';

import {
  authHandler,
  authCallbackHandler,
} from 'server/app/handlers/auth-handlers';
import {applicationHandler} from 'server/app/handlers/application-handlers';

function authorize(req, res, next) {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
}

const router = new Router();

router.use('/auth', new Router()
  .get('/:provider', authHandler)
  .get('/:provider/callback', authCallbackHandler)
);
router.get('/app/*', authorize, applicationHandler);
router.get('/', applicationHandler);

export default router;
