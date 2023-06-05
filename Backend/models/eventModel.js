const mongoose = require("mongoose");

const d = new Date();
const eventSchema = new mongoose.Schema(
    {
        organizer: {
            type: String,
            required: true,
            trim: true,
            maxlength: 225,
        },
        createdBy: { type: String, require: true },
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
        participants: {
            type: Number,
            require: true,
            default: 1,
        },
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

module.exports = mongoose.model("event", eventSchema);
