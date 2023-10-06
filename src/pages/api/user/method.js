import mongoose from 'mongoose';
import User from '../../../models/user';
import connectMongo from '@utils/connectDB';

export default async function handler(req, res) {
	const { action, _id, actionData = {} } = req.body;
	// Connect to MongoDB
	await connectMongo();

	try {
		let responseMessage;
		let statusCode = 200;

		switch (action) {
			case 'add':
				const existingUser = await User.findOne({ email: actionData.email });
				if (existingUser) {
					responseMessage = 'The email address entered is already in use.';
					statusCode = 409;
				} else {
					const newUser = new User(actionData);
					await newUser.save();
					responseMessage = "Thank you for submitting your request. We'll get back to you as soon as possible.";
				}
				break;

			case 'get':
				const users = await User.find(actionData);

				console.log('Users retrieved');
				res.status(200).json(users);
				break;

			case 'update':
				const updatedUser = await User.findByIdAndUpdate(_id, actionData, { new: true });
				if (!updatedUser) {
					responseMessage = 'User not found';
					statusCode = 404;
				} else {
					responseMessage = 'User updated successfully';
				}
				break;

			case 'delete':
				const deletedUser = await User.findByIdAndRemove(_id);
				if (!deletedUser) {
					responseMessage = 'User not found';
					statusCode = 404;
				} else {
					responseMessage = 'User deleted successfully';
				}
				break;

			default:
				responseMessage = 'Invalid action';
				statusCode = 400;
				break;
		}

		console.log(responseMessage);
		res.status(statusCode).json({ message: responseMessage });
	} catch (error) {
		console.error('Error:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
}
