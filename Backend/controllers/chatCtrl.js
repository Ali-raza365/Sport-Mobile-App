
const { CheckEvents } = require('../middleware/events');
const Event = require('../models/eventModel');
const User = require('../models/userModel');


const chatCtrl = {
    getChatList: async (req, res) => {
        try {
            if (!req.user._id) return res.status(400).json({ msg: "invalid Token!" })
            const userId = req.user._id
            const chatlist = await Event.aggregate([
                {
                    $match: {
                        participants: { $in: [userId] }
                    }
                },
                { $addFields: { chat: { $reverseArray: "$chat" } } },
                { $addFields: { lastMessage: { $arrayElemAt: ["$chat", 0] } } },
                {
                    $lookup: {
                        from: "users", // Replace "users" with the actual collection name for users
                        localField: "lastMessage.user",
                        foreignField: "_id",
                        as: "lastMessage.user"
                    }
                },
                { $unwind: "$lastMessage.user" },
                {
                    $sort: {
                        "lastMessage.createdAt": -1,
                        "lastMessage.message": 1
                    }
                },
                {
                    $project: {
                        location: 0,
                        max_participants: 0,
                        total_participants: 0,
                        participants: 0,
                        favorites: 0,
                        chat: 0,
                        'lastMessage.user.password': 0,
                        'lastMessage.user.role': 0,
                        'lastMessage.user.mobile': 0,
                    }
                },
            ])
            // .select('-location -max_participants -total_participants -participants -favorites')
            // .populate('chat.user',' fullname email avatar').exec()

            if (!chatlist) {
                return res.status(404).json({ message: 'Chatlist not found' });
            }
            return res.json({ chatlist });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    getmessages: async (req, res) => {
        try {
            const { event_id } = req.body
            if (!req.user._id) return res.status(400).json({ msg: "invalid Token!" })
            const userId = req.user._id

            const messages = await Event.findById(event_id)
                // .populate('chat',
                //   'fullname email avatar'
                // )
                .select('chat')
                .exec()

            if (!messages?.chat) {
                return res.status(404).json({ message: 'messages not found' });
            }
            return res.json({ messages: messages?.chat });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
}
module.exports = chatCtrl