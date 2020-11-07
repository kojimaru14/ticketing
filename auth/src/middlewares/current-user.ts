import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
}

declare global {                  // This is how we can reach into an existing type definition and make a modification to it.
  namespace Express {
    interface Request {
      currentUser?: UserPayload;  // We want to have a property called "currentUser" augmented to "Request". (Note the "?" at the end. "currentUser" may or may not be defined because the user might not be logged in)
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if ( !req.session?.jwt ) {  // <= this syntax is the same as this: if(!req.session || !req.session.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
    req.currentUser = payload;
  } catch (err) {}

  next();
}