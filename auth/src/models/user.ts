import mongoose from 'mongoose';

// An interface that describes the properties 
// that are required to create a new User
interface UserAttrs {
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
const User = mongoose.model('User', userSchema);

// This is the function to make sure that user model follows TypeScript requirements
const buildUser = (attrs: UserAttrs) => {
  return new User(attrs);
};

// When creating a user, we can do something like
// const personA = buildUser({ email: "test@test.com", password: "12345" });

export { User, buildUser };