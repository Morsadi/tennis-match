import mongoose from 'mongoose';
import User from '../../../models/user';
import connectMongo from '@utils/connectDB';

export default async function handler(req, res) {
  const {
    action,
    _id,
    updates = {} // The updates you want to apply to the user
  } = req.body;

  try {
    // Find the user by _id and update it
    const updatedUser = await User.findByIdAndUpdate(_id, updates, { new: true });

    if (!updatedUser) {
      console.log('User not found');
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('User updated successfully');
    res.status(200).json({
      message: 'User updated successfully',
      updatedUser,
    });
  } catch (error) {
    // Handle any errors that may occur during the update
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
