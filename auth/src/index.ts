import mongoose from 'mongoose'; // library we use to connect to MongoDB

import { app } from './app';

const start = async() => {
  if (!process.env.JWT_KEY){ 
    throw new Error('JWT_KEY must be defined.'); // We immediately throw the error and stop running express if JWT key string is not defined in the environment variable of the pod.
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', { // "auth-mongo-srv" is the IP address/domain of mongoDB, "auth" is the name of DB.
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log("connected to MongoDB");
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!');
  });
}

start();