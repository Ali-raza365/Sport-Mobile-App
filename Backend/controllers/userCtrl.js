const Users = require('../models/userModel')

const userCtrl = {
    getUserInfo: async (req, res) => {
        try {
            const user = await Users.findById(req.user._id).select('-password')
            if (!user) return res.status(400).json({ msg: "User does not exist." })
            res.json({ user })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getUsers: async (req, res) => {
        try {
            const users = await Users.find({}).select('-password')
            if (!users) return res.status(400).json({ msg: "User does not exist." })

            res.json({ users })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateUser: async (req, res) => {
        try {
            const { fullname,username, email, avatar, mobile, address, role, } = req.body
            if (!fullname) return res.status(400).json({ msg: "Please add your full name." })
            if (!email) return res.status(400).json({ msg: "Please add your email address." })
            const email_user = await Users.findOne({ email })
            if(email_user){
                if (email_user?._id?.toString() !== req.user._id?.toString()) return res.status(400).json({ msg: "This email already exists." })
            }
            const username_user = !!username ? await Users.findOne({ username }):null
            if(username_user){
                if (username_user?._id?.toString() !== req.user._id?.toString()) return res.status(400).json({ msg: "This username already exists." })
            }

            let updatedUser = await Users.findOneAndUpdate({ _id: req.user._id }, {
                username,fullname, email, avatar: req?.imageUrl || avatar, address, mobile, role,
            }, { new: true }).select('-password')
            res.json({ msg: "Profile Updated Successfully", user: updatedUser })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

}


module.exports = userCtrl