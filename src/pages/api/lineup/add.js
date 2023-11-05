// Import necessary modules and models
import connectMongo from '@utils/connectDB';
import Lineup from '../../../models/lineup';

export default async function handler(req, res) {
	// Connect to MongoDB
	await connectMongo();

	try { 
		const { actionData } = req.body;

		// Check if user with the same email already exists
		const existingLineup = await Lineup.findOne({ _id: actionData._id });

		if (existingLineup) {
			return res.status(404).json({ message: 'Lineup already exists.' });
		}

		// Create a new user
		const newLineup = new Lineup(actionData);

		await newLineup.save();

		return res.status(200).json({ message: 'Lineup added successfully.' });
	} catch (error) {
		console.error('Error:', error);
		return res.status(500).json({ error: 'Thanks for your patience. There has been an error in the server. We are working on it.' });
	}
}
