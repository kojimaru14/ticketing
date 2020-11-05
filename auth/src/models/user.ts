import mongoose from 'mongoose';
import { Password } from '../services/password';

// An interface that describes the properties 
// that are required to create a new User
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describes the properties that a User Model has.
// Telling TypeScript about the existence of "build" function.
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that desribes the properties that a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String, // This "String" is capitalised
    required: true
  }, // This is how we define Schema in mongoDB, this is NOT TypeScript syntax.
  password: {
    type: String,
    required: true
  }
});

// "pre" is a middleware function implemented in mongoose.
// anytime we try to "save" something into database, this function gets executed.
userSchema.pre('save', async function(done) {
  if( this.isModified('password') ) { // "this" is userSchema class
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done(); // We need to call done -- mongoose does not have great support of out of the box for async/await
});

// We want to do something like this:
// const personA = User.build({ email: "test@test.com", password: "12345" });
// so that we can just export User model and don't need to export build function
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

// angle brackets <> allow us to customise the types of the Documents/Models we pass in as the argument
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };