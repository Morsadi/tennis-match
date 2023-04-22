import { Schema, model, models, connect } from 'mongoose';

// Define the user schema
const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
});

// Connect to the MongoDB database
const uri = 'mongodb://localhost:27017/mydatabase';
connect(uri)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// Define the User model
const User = model('User', userSchema);

export default User;
