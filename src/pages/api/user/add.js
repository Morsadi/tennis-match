// Import necessary modules and models
import connectMongo from '@utils/connectDB';
import User from '../../../models/user';

export default async function handler(req, res) {
	// Connect to MongoDB
	await connectMongo();

	try {
		const { actionData } = req.body;

		// Check if user with the same email already exists
		const existingUser = await User.findOne({ email: actionData.email });

		if (existingUser) {
			return res.status(404).json({ message: 'The email address entered is already in use.' });
		}

		// Create a new user
		const newUser = new User(actionData);

		await newUser.save();

		return res.status(200).json({ message: 'User added successfully.' });
	} catch (error) {
		console.error('Error:', error);
		return res.status(500).json({ error: 'Thanks for your patience. There has been an error in the server. We are working on it.' });
	}
}
