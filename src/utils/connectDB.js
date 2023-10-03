import mongoose from 'mongoose';

const connectMongo = async () => {
  const uri = 'mongodb://localhost:27017/Lineup2v';
	mongoose
		.connect(uri)
		.then(() => console.log('Users DB connected'))
		.catch((err) => console.log(err));
};

export default connectMongo;
