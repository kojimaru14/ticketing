import express from 'express';

const router = express.Router();

router.post('/api/users/signout', (req, res)=> {
  req.session = null; // Ref: https://www.npmjs.com/package/cookie-session#destroying-a-session
  res.send({});
});

export { router as signoutRouter };