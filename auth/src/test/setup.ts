import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

import { app } from '../app';

let mongo: any;

// A hook that runs before all of our different test start up
beforeAll(async () => {
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

// A hook that runs before each of our tests are going to run
beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

// A hook that runs after all our tests are complete
afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});