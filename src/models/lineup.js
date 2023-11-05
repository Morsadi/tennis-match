const { Schema, model, models } = require('mongoose');
const User = require('./user');

const CourtSchema = new Schema({
	number: {
		type: Number,
	},
	courtSides: {
		a: {
			type: String,
			default: '',
		},
		b: {
			type: String,
			default: '',
		},
		c: {
			type: String,
			default: '',
		},
		d: {
			type: String,
			default: '',
		},
	},
});

const LineupSchema = new Schema({
	courts: [CourtSchema],
	created: {
		type: Date,
		default: Date.now,
	},
	open: {
		type: Boolean,
		default: true,
	},
	published: {
		type: Boolean,
		default: false,
	},
});

// Check if the Lineup model is already defined to prevent redefinition
const Lineup = models.Lineup || model('Lineup', LineupSchema);

// Export the model
export default Lineup;
