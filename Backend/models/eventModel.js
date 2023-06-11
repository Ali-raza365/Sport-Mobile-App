const mongoose = require("mongoose");
const ChatModal = require("./chatModel");

const d = new Date();
const eventSchema = new mongoose.Schema(
    {
        organizer: {
            type: String,
            required: true,
            trim: true,
            maxlength: 225,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        favorites: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
            },
        ],
        image: {
            type: String,
            require: true
        },
        title: {
            type: String,
            minLength: 5,
            maxlength: 30,
            require: true,
        },
        description: {
            type: String,
            minLength: 5,
            require: true,
        },
        max_participants: {
            type: Number,
            require: true,
            default: 1,
        },
        total_participants: {
            type: Number,
            require: true,
            default: 1,
        },
        chat: [ChatModal.schema],
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
            },
        ],
        activity: {
            name: String,
            activity_id: String,
        },
        date: {
            type: Date,
            default: d,
        },
        time: {
            type: String,
            require: true,
        },
        location: {
            name: String,
            type: {
                type: String,
                default: 'Point',
            },
            coordinates: {
                type: [Number]
            }
        }
    },
    {
        timestamps: true,
    }
);
eventSchema.index({ location: '2dsphere' });

eventSchema.pre('findOne', function (next) {
    this.populate('chat.user');
    next();
});


module.exports = mongoose.model("event", eventSchema);
