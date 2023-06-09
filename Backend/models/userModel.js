const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    username: {
        type: String,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png'
    },
    resetPasswordToken:String,
    resetPasswordExpires:String,
    role: { type: String, default: 'user' },
    mobile: { type: String, default: '' },
    favorites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'event',
        },
    ],
    address: {
        name: String,
        coordinates: {
            latitude: Number,
            longitude: Number
        }
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('user', userSchema)