import mongoose from "mongoose";

const connectMongo = async () => {
    const url = 'mongodb://localhost:27017/tennis-app';
    mongoose.connect(url)
}

export default connectMongo;