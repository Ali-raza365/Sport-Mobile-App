const mongoose = require("mongoose");

const sportActivitiesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 225,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("sportActivities", sportActivitiesSchema);
