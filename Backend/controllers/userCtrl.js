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
            const { fullname, email, avatar, mobile, address, role, } = req.body
            if (!fullname) return res.status(400).json({ msg: "Please add your full name." })

        let updatedUser =  await Users.findOneAndUpdate({ _id: req.user._id }, {
                fullname, email, avatar, address, mobile, role,
            },{ new: true }).select('-password')
            res.json({ msg: "Update Success!",user:updatedUser })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

}


module.exports = userCtrl