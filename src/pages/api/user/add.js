import mongoose from 'mongoose';
import User from '../../../models/user';
import connectMongo from '@utils/connectDB'

export default async function handler(req, res) {
	const { firstName, lastName, email, level, referrer } = req.body;


	// Connect to MongoDB
	await connectMongo();

	try {
		// Check if user exists
		const existingUser = await User.findOne({ email });

		if (existingUser) {
			res.status(200).json({ message: 'The email address entered is already in use.' });
			return;
		}

		const newUser = new User({ firstName, lastName, email, level, referrer });
		await newUser.save();
		console.log('User saved');
		res.status(200).json({
			message: "Thank you for submitting your request. We'll get back to you as soon as possible.",
		});
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
}
