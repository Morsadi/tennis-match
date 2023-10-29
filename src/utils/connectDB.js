import mongoose from 'mongoose';

const client = 'hot_shots';

const connectMongo = async () => {
  const uri = `mongodb://localhost:27017/${client}`;
	mongoose
		.connect(uri)
		.then(() => console.log('Users DB connected'))
		.catch((err) => console.log(err));
};

export default connectMongo;
