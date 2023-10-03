import mongoose from 'mongoose';
import User from '../../../models/user';
import connectMongo from '@utils/connectDB'

export default async function handler(req, res) {
	// Connect to MongoDB
	await connectMongo();

	try {
		const users = await User.find();

		console.log('Users retrieved');
		res.status(200).json(users);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}
