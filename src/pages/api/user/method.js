import mongoose from 'mongoose';
import User from '../../../models/user';

export default async function handler(req, res) {
  const { action, _id, updates = {} } = req.body;

  try {
    if (action === 'delete') {
      // Find and delete the user by _id
      const deletedUser = await User.findByIdAndRemove(_id);

      if (!deletedUser) {
        console.log('User not found');
        return res.status(404).json({ error: 'User not found' });
      }

      console.log('User deleted successfully');
      res.status(200).json({
        message: 'User deleted successfully',
      });
    } else if (action === 'update') {
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
    } else {
      // Handle invalid action
      console.log('Invalid action:', action);
      res.status(400).json({ error: 'Invalid action' });
    }
  } catch (error) {
    // Handle any errors that may occur during the operation
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
