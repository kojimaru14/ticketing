import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router.post('/api/users/signup', [
    body('email') // adding "body" module as middleware
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()     // sanitisation (removing leading space, etc.)
      .isLength({ min: 4, max: 20})
      .withMessage('Password must be between 4 and 20 characters')
  ], 
  validateRequest,
  async(req: Request, res: Response)=> {
    const { email, password } = req.body;
    const existingUser = await User.findOne({email});
    if( existingUser ) {
      throw new BadRequestError(`Email \"${email}\" is in use`);
    }

    const user = User.build({email, password});
    await user.save();  // building user doesn't save the record to DB, we need to save it.

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_KEY! // The priavete key string is pulled from the env variable which is defined in deployment (auth-depl.yaml)
    );

    // Store it on session object
    req.session = { jwt: userJwt };

    res.status(201).send(user);
  }
);

export { router as signupRouter };