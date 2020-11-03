import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.post('/api/users/signup', [
    body('email') // adding "body" module as middleware
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()     // sanitisation (removing leading space, etc.)
      .isLength({ min: 4, max: 20})
      .withMessage('Password must be between 4 and 20 characters')
  ], (req: Request, res: Response)=> {
    const errors = validationResult(req);

    if( !errors.isEmpty() ) {
      return res.status(400).send(errors.array());
    }

    const { email, password } = req.body;
    console.log('Creating a user..');

    res.send('Hi there');
  }
);

export { router as signupRouter };