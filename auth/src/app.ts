import express from 'express';
import 'express-async-errors';   // express by default requires exception to be passed to "next" function within "async" function but this package lets us not worry about it
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found-error'

const app = express();
app.set('trust proxy', true); // We use nginx proxy and we want to trust this proxy
app.use(json());
app.use(cookieSession({
  signed: false, // Do not encrypt cookie
  secure: true,  // require HTTPS connection when sending cookie
}));

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async() => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };