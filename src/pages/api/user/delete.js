// Import necessary modules and models
import connectMongo from '@utils/connectDB';
import User from '../../../models/user';

export default async function handler(req, res) {
  // Connect to MongoDB
  await connectMongo();

  try {
    const { _id } = req.body;

    // Delete the user based on the provided ID
    const deletedUser = await User.findByIdAndRemove(_id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
