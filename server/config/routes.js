const {Router} = require('express');

const {
  authHandler,
  authCallbackHandler,
  logoutHandler,
} = require('server/app/handlers/auth-handlers');
const {applicationHandler} = require('server/app/handlers/application-handlers');

const router = new Router();

router.use('/auth', new Router()
  .get('/:provider', authHandler)
  .get('/:provider/callback', authCallbackHandler)
);
router.get('/logout', logoutHandler);
router.get('/*', applicationHandler);

module.exports = router;
