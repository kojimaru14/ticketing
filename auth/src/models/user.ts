import mongoose from 'mongoose';

// An interface that describes the properties 
// that are required to create a new User
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describes the properties that a User Model has.
// Telling TypeScript about the existence of "build" function.
interface UserModel extends mongoose.Model<any> {
  build(attrs: UserAttrs): any;
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
// We want to do something like this:
// const personA = User.build({ email: "test@test.com", password: "12345" });
// so that we can just export User model and don't need to export build function
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<any, UserModel>('User', userSchema);

export { User };