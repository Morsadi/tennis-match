const { Schema, model, models } = require('mongoose');
const User = require('./user');

const CourtSchema = new Schema({
    number: {
        type: Number,
    },
    courtSides: {
        a: {
            type: Schema.Types.Mixed,
            default: {},
            required: true
        },
        b: {
            type: Schema.Types.Mixed,
            default: {},
            required: true
        },
        c: {
            type: Schema.Types.Mixed,
            default: {},
            required: true
        },
        d: {
            type: Schema.Types.Mixed,
            default: {},
            required: true
        }
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
