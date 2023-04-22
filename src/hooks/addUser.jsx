import connectMongo from "../utils/connectDB";
import { useState } from "react";
import mongoose from "mongoose";
// import User from "@models/user";

export default function UseAddUser() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const addUser = async (userData) => {
		setIsLoading(true);

		try {
			// Connect to the MongoDB database using Mongoose
			await connectMongo();

			console.log("connected");

			// Define a Mongoose schema for the User model
			const userSchema = new mongoose.Schema({
				name: String,
				email: String,
				password: String,
			});

			// Create a Mongoose model for the User schema
			const User = mongoose.model("User", userSchema);

			// Create a new user object using the passed in userData
			const newUser = new User(userData);

			// Save the new user to the MongoDB database
			await newUser.save();
			// const newUser = new User(userData);

			// Save the new user to the MongoDB database
			// await newUser.save();

			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			setError(error);
		}
	};
	return [ addUser, isLoading, error ];
}
