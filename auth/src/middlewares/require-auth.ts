import { Request, Response, NextFunction } from 'express';

import { NotAuthorizedError } from '../errors/not-authorized-error';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if(!req.currentUser) {
    throw new NotAuthorizedError();
  }

  next(); // Assuming the user is logged in, we should just call "next" and let the next function be executed
};