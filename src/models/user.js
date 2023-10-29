import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
	first_name: {
		type: String,
		required: true,
	},
	last_name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	passcode: {
		type: String,
		validate: {
			validator: function (v) {
				// Ensure that the passcode is exactly 4 digits
				return /^\d{4}$/.test(v);
			},
			message: 'Passcode must be a 4-digit number.',
		},
		default: '0000',
	},
	level: {
		type: Number,
		required: true,
		default: 2,
	},
	referrer: String,
	partner: {
		type: String,
		default: '',
	},
	approved: {
		type: Boolean,
		default: false,
	},
	is_playing_this_week: {
		type: Boolean,
		default: false,
	},
	registration_date: {
		type: Date,
		default: Date.now,
	},
});

const User = models.users || model('users', userSchema);

export default User;
