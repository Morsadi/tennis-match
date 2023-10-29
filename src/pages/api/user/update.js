// Import necessary modules and models
import connectMongo from '@utils/connectDB';
import User from '../../../models/user';

export default async function handler(req, res) {
	// Connect to MongoDB
	await connectMongo();

	try {
		const { _ids, actionData } = req.body;

		console.log(_ids, actionData);

		// Update multiple users based on the provided IDs
		const filter = _ids.length ? { _id: { $in: _ids } }: {};
		const update = { $set: actionData };
    
		const updateResult = await User.updateMany(filter, update);

		if (updateResult.nModified === 0) {
			return res.status(404).json({ message: 'No users found for the provided IDs' });
		}

		return res.status(200).json({ message: 'Users updated successfully' });
	} catch (error) {
		console.error('Error:', error);
		return res.status(500).json({ error: 'Internal server error' });
	}
}
