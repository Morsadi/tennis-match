import connectMongo from '@utils/connectDB'
import User from '../../../models/user'

export default async function handler(req, res) {
  let results = [];
  const {name, email} = req.body;
  
  try {
    
  await connectMongo();
  
  // const user = new User({
  //   name,
  //   email
  // })
  // user.save();
  
  const allUsers = await User.find()
  
  res.status(200).json(allUsers);
} catch (err){
  res.status(500).json({err});
}
}
