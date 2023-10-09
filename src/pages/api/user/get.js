// Import necessary modules and models
import connectMongo from '@utils/connectDB';
import User from '../../../models/user';

export default async function handler(req, res) {
  // Connect to MongoDB
  await connectMongo();

  try {
    const { query } = req;

    // Fetch users based on optional query parameters
    console.log(query);
    const users = await User.find(query);


    return res.status(200).json(users);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
