import mongoose from "mongoose";

const uri = "mongodb://localhost:27017/users";
mongoose
	.connect(uri)
	.then(() => console.log("Users DB connected"))
	.catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
});

const User = mongoose.model("User", userSchema);

export default async function handler(req, res) {
    const { name, email, password } = req.body;
  
    try {
      const newUser = new User({ name, email, password });
      await newUser.save();
      res.status(200).json({ message: 'User added successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  