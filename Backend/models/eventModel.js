const mongoose = require("mongoose");

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
        date: {
            type: Date,
            default:new Date(),
        },
        time: {
            type: String,
            require: true,
        },
        location: {
            name: String,
            coordinates: {
                latitude: Number,
                longitude: Number
            }
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("event", eventSchema);
