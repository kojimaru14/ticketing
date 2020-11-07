import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/api/users/currentuser', (req, res)=> {
  if(!req.session?.jwt) { // <= this syntax is the same as this: if(!req.session || !req.session.jwt) {
    return res.send({ currentUser: null});
  }

  try {
    const payload = jwt.verify(
      req.session.jwt, 
      process.env.JWT_KEY!
    );  // if JSON web token is tampered with (or seen as invalid), verify method will thrown an exception
    res.send({currentUser: payload});
  } catch (err) {
    res.send({currentUser: null});
  }
  
});

export { router as currentUserRouter };