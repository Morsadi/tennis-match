// import connectMongo from '@utils/connectDB'
// import { useState } from 'react';
// import User from '../../../models/user'

// export default async function handler(req, res) {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const addUser = async (userData) => {
//     setIsLoading(true);

//     try {
//       // Connect to the MongoDB database using Mongoose
//       await connectMongo();

//       const newUser = new User(userData);

//       // Save the new user to the MongoDB database
//       await newUser.save();

//       setIsLoading(false);
//     } catch (error) {
//       setIsLoading(false);
//       setError(error);
//     }
//   };
//   return [ addUser,  isLoading, error ]
// }