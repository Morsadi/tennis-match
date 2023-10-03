import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
	firstName: String,
	lastName: String,
	email: String,
	level: Number,
	referrer: String,
	approved: {
		type: Boolean,
		default: false,
	},
});

const User = models.users || model('users', userSchema);

export default User;
