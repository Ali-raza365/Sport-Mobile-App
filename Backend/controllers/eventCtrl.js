
const { CheckEvents } = require('../middleware/events');
const Event = require('../models/eventModel');
const User = require('../models/userModel');


const geoNearPipeline = (longitude, latitude, radiusInKm,) => ({
    $geoNear: {
        near: {
            type: 'Point',
            coordinates: [longitude, latitude],
        },
        distanceField: "distance",
        maxDistance: radiusInKm * 1000, // Convert radius to meters
        spherical: true,
    }
})

const pipeline = (user_id) => ([
    {
        $addFields: {
            isParticipated: {
                $in: [user_id, '$participants']
            }
        }
    },
    {
        $addFields: {
            isFavorite: {
                $in: [user_id, '$favorites']
            }
        }
    },
    // {
    //     $addFields: {
    //         isPanding: {
    //             $in: [user_id, '$requests']
    //         }
    //     }
    // },
    {
        $project: {
            participants: 0,
            requests: 0,
            favorites: 0,
            chat: 0,
        }
    },
])

const eventCtrl = {
    createEvent: async (req, res) => {
        try {
            const currentdate = new Date();
            const { organizer, activity, title, description, max_participants, date, time, location } = req.body
            console.log(location);
            const loc = !!location ? JSON.parse(location) : null

            const act = !!activity ? JSON.parse(activity) : null;

            if (!req?.user?._id) return res.status(400).json({ msg: "invalid Token!" })

            const newEvent = new Event({
                organizer, title, description,
                max_participants,
                time,
                location: loc,
                activity: act,
                createdBy: req.user._id,
                date: !!date ? date : currentdate,
                image: req?.imageUrl || '',
            })
            newEvent.participants.push(req?.user?._id);

            await newEvent.save()

            res.json({
                msg: 'Event Created Successfully!',
                newEvent: {
                    ...newEvent._doc,
                }
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getEvents: async (req, res) => {
        try {
            const events = await Event.find({})
                .select("-chat -participants -favorites -requests")
                .sort({ createdAt: -1 })
            if (!events) return res.status(400).json({ msg: "events does not found" })
            res.json({ events: events })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getMyEvent: async (req, res) => {
        try {
            if (!req.user._id) return res.status(400).json({ msg: "invalid Token!" })
            const userId = req.user._id
            const events = await Event.aggregate([{ $match: { createdBy: userId } }, ...pipeline(userId), { $sort: { createdAt: -1, }, }]);
            if (!events) return res.status(400).json({ msg: "No events found!" })
            res.json({ events })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getEventDetails: async (req, res) => {
        const { event_id } = req.body
        try {
            const event = await Event.findById(event_id).select('-chat')
                .populate('participants', 'fullname email avatar')
                .populate('favorites', 'fullname email avatar')
                .populate('requests', 'fullname email avatar')
                .exec();
            if (!event) return res.status(400).json({ msg: "Event not found" })
            res.json({ event })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getEventById: async (req, res) => {
        try {
            const events = await Event.find({ createdBy: req.user._id })
                .select("-chat -participants -favorites -requests")
                .sort({ createdAt: -1 })
            if (!events) return res.status(400).json({ msg: "No events found!" })
            res.json({ events })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getEventByActivity: async (req, res) => {
        try {
            const activityId = req.query.id
            if (!activityId) return res.status(400).json({ msg: "No Sport Activity found!" })
            const events = await Event.find({ 'activity.activity_id': activityId })
                .sort({ createdAt: 1 })
                .exec();
            if (!events) return res.status(400).json({ msg: "No events found!" })
            const eventList = await CheckEvents(events, req?.user?._id)
            res.json({ events: eventList })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateEvent: async (req, res) => {
        try {
            const { event_id, organizer, image, title, description, participants, date, time, location } = req.body

            if (!event_id) return res.status(400).json({ msg: "Event not found" })

            let updatedEvent = await Event.findOneAndUpdate({ _id: event_id },
                { organizer, image, title, description, participants, date, time, location, }, { new: true })
            res.json({ msg: "Update Success!", event: updatedEvent })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteEvent: async (req, res) => {
        try {
            const { event_id } = req.body
            if (!event_id) return res.status(400).json({ msg: "event not found!" })
            await Event.findByIdAndDelete({ _id: event_id })

            res.json({
                msg: 'Event Deleted Successfully!',

            })
        } catch (err) {
            return res.status(400).json({ msg: err.message })
        }
    },
    getEventsByLocation: async (req, res) => {

        const radiusInKm = req.body.radius || 5;
        const longitude = parseFloat(req.body.longitude);
        const latitude = parseFloat(req.body.latitude);
        const user_id = req?.user?._id;

        if (isNaN(longitude) || isNaN(latitude)) {
            return res.status(400).json({ message: 'Invalid coordinates' });
        }
        try {
            const events = await Event.aggregate([geoNearPipeline(longitude, latitude, radiusInKm), ...pipeline(user_id)]);

            if (!events) return res.status(400).json({ msg: "No events found!" })

            res.json({ events })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getEventNearMe: async (req, res) => {
        const radiusInKm = req.body.radius || 5;
        const longitude = parseFloat(req.body.longitude);
        const latitude = parseFloat(req.body.latitude);
        const user_id = req?.user?._id;
        console.log({ Qury: req.body });
        if (isNaN(longitude) || isNaN(latitude)) {
            return res.status(400).json({ message: 'Invalid coordinates' });
        }
        try {
            const events = await Event.aggregate([geoNearPipeline(longitude, latitude, radiusInKm), ...pipeline(user_id),
            {
                $sort: {
                    participants: -1,
                },
            },
            {
                $limit: 10,
            },]);
            if (!events) return res.status(400).json({ msg: "No events found!" })

            res.json({ events })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getRecommendedEvent: async (req, res) => {
        console.log(req.body);
        const radiusInKm = req.body.radius || 5;
        const longitude = parseFloat(req.body.longitude);
        const latitude = parseFloat(req.body.latitude);
        const user_id = req?.user?._id;
        if (isNaN(longitude) || isNaN(latitude)) {
            return res.status(400).json({ message: 'Invalid coordinates' });
        }
        try {
            const events = await Event.aggregate([geoNearPipeline(longitude, latitude, radiusInKm), ...pipeline(user_id),
            {
                $sort: {
                    participants: -1,
                },
            },
            {
                $limit: 10,
            },]);
            if (!events) return res.status(400).json({ msg: "No events found!" })
            res.json({ events: events })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    searchEvent: async (req, res) => {
        const radiusInKm = req.query.radius || 5;
        const longitude = parseFloat(req.query.longitude);
        const latitude = parseFloat(req.query.latitude);
        const searchText = req.query.text || '';

        console.log(req?.query);
        const locationQuery = {}

        if (isNaN(longitude) || isNaN(latitude)) {
            // return res.status(400).json({ message: 'Invalid coordinates' });
        } else {
            locationQuery = {
                location: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [longitude, latitude],
                        },
                        $maxDistance: (radiusInKm * 10000), // Convert km to meters
                    },
                },
            }
        }
        try {
            const events = await Event
                .find({
                    $and: [
                        locationQuery,
                        {
                            $or: [
                                { title: { $regex: searchText, $options: 'i' } },
                                { description: { $regex: searchText, $options: 'i' } },
                                { organizer: { $regex: searchText, $options: 'i' } },
                                { "activity.name": { $regex: searchText, $options: 'i' } },
                                { "location.name": { $regex: searchText, $options: 'i' } },
                            ],
                        },
                    ],
                })
                .sort({ createdAt: 1 });

            console.log(events);
            res.json({ events });
        } catch (err) {
            return res.status(500).json({ msg: err });
        }
    },
    addToFavourite: async (req, res) => {
        const { event_id } = req.body;
        try {
            if (!req.user._id) return res.status(400).json({ msg: "invalid Token!" })
            const userId = req.user._id

            const user = await User.findByIdAndUpdate(
                userId,
                { $addToSet: { favorites: event_id } }, // Using $addToSet to prevent duplicate entries
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const event = await Event.findByIdAndUpdate(
                event_id,
                { $addToSet: { favorites: userId } }, // Using $addToSet to prevent duplicate entries
                { new: true }
            );


            if (!event) {
                return res.status(404).json({ message: 'Event not found' });
            }


            res.json({ message: 'Event added to favorites' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    removeToFavourite: async (req, res) => {
        const { event_id } = req.body;
        try {

            if (!req.user._id) return res.status(400).json({ msg: "invalid Token!" })
            const userId = req.user._id
            const user = await User.findByIdAndUpdate(
                userId,
                { $pull: { favorites: event_id } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const event = await Event.findByIdAndUpdate(
                event_id,
                { $pull: { favorites: userId } },
                { new: true }
            );

            if (!event) {
                return res.status(404).json({ message: 'Event not found' });
            }

            res.json({ message: 'Event removed from favorites' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    getAllFavouriteByuser: async (req, res) => {
        try {
            if (!req.user._id) return res.status(400).json({ msg: "invalid Token!" })
            const userId = req.user._id
            const user = await User.findById(userId).populate('favorites')
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const eventList = await CheckEvents(user.favorites, req?.user?._id)
            const favoriteEvents = eventList;
            return res.json({ favoriteEvents });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    sendParticipantRequest: async (req, res) => {
        const { event_id } = req.body;
        try {
            if (!req.user._id) return res.status(400).json({ msg: "invalid Token!" })
            const userId = req.user._id
            if (!event_id) return res.status(400).json({ msg: "event id is required!" })

            const event = await Event.findById(event_id);
            if (!event) {
                return res.status(500).json({ message: 'Event not found' });
            }
            if (event?._doc?.participants?.includes(userId)) {
                return res.status(500).json({ message: 'you are already Participant in this event ' });
            }
            if (event.total_participants >= event.max_participants) {
                return res.status(500).json({ message: "Maximum number of participants reached" });
            }
            let updateEvent = await Event.findByIdAndUpdate(
                event_id,
                { $addToSet: { requests: userId } },
                { new: true }
            );
            await event.save();
            res.json({ message: 'Participant request send successfully!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    removeParticipantRequest: async (req, res) => {
        const { event_id,userId } = req.body;
        try {
            if (!userId) return res.status(400).json({ msg: "user Id required!" })
            const event = await Event.findByIdAndUpdate(
                event_id,
                { $pull: { requests: userId } },
                { new: true }
            );
            if (!event) {
                return res.status(404).json({ message: 'Event not found' });
            }

            res.json({ message: ' Participant request cancel successfully ' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    getParticipantRequests: async (req, res) => {
        try {
            if (!req.user._id) return res.status(400).json({ msg: "invalid Token!" })
            const userId = req.user._id
            const events = await Event.aggregate([
                { $match: { createdBy: userId } },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'requests',
                        foreignField: '_id',
                        as: 'request_details',
                    },
                },
                { $unwind: '$request_details' },

                {
                    $project: {
                        _id: 0,
                        requests: {
                            _id: '$request_details._id',
                            fullname: '$request_details.fullname',
                            email: '$request_details.email',
                            avatar: '$request_details.avatar',
                            eventTitle: '$title',
                            description: '$description',
                            date: '$date',
                            activity: '$activity.name',
                            image: '$image',
                            event_id: '$_id',
                        },
                    },
                },
            ])
            console.log("working");

            if (!events) {
                return res.status(404).json({ message: 'Events not found' });
            }
            const concatenatedArray = events.reduce((accumulator, event) => {
                return accumulator.concat(event.requests);
            }, []);

            return res.json({ requests: concatenatedArray || [] });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    acceptParticipant: async (req, res) => {
        const { event_id,userId } = req.body;
        try {
            if (!userId) return res.status(400).json({ msg: "user Id required!" })
            const event = await Event.findById(event_id);
            if (!event) {
                return res.status(500).json({ message: 'Event not found' });
            }
            if (event.total_participants >= event.max_participants) {
                return res.status(500).json({ message: "Maximum number of participants reached" });
            }

            await Event.findByIdAndUpdate(
                event_id,
                { $pull: { requests: userId } },
                { new: true }
            );

            let updateEvent = await Event.findByIdAndUpdate(
                event_id,
                { $addToSet: { participants: userId } },
                { new: true }
            );
            event.total_participants = updateEvent.participants.length;
            await event.save();
            res.json({ message: 'you are successfully participanted in this event' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    removeParticipant: async (req, res) => {
        const { event_id } = req.body;
        try {
            if (!req.user._id) return res.status(400).json({ msg: "invalid Token!" })
            const userId = req.user._id

            const event = await Event.findByIdAndUpdate(
                event_id,
                { $pull: { participants: userId } },
                { new: true }
            );
            if (!event) {
                return res.status(500).json({ message: 'Event not found' });
            }
            console.log(event)
            event.total_participants = event.participants.length;
            if (!event) {
                return res.status(404).json({ message: 'Event not found' });
            }
            res.json({ message: 'removed successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    getEventsByuserParticipant: async (req, res) => {
        try {
            if (!req.user._id) return res.status(400).json({ msg: "invalid Token!" })
            const userId = req.user._id
            const events = await Event.find({ participants: { $in: [userId] }, createdBy: { $ne: userId } })

            if (!events) {
                return res.status(404).json({ message: 'Events not found' });
            }
            const eventList = await CheckEvents(events, userId)
            return res.json({ events: eventList || [] });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
}
module.exports = eventCtrl



        // "requests": [
        //     {
        //         "_id": "6471054db3c216a529926306",
        //         "fullname": "Demo user",
        //         "email": "demo@gmail.com",
        //         "avatar": "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
        //     },
        //     {
        //         "_id": "6471054db3c216a529926306",
        //         "fullname": "Demo user",
        //         "email": "demo@gmail.com",
        //         "avatar": "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
        //     },
        //     {
        //         "_id": "6471054db3c216a529926306",
        //         "fullname": "Demo user",
        //         "email": "demo@gmail.com",
        //         "avatar": "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
        //     },
        //     {
        //         "_id": "6492006b6f1538b249f9e329",
        //         "fullname": "Ali Raza",
        //         "email": "mianraza645@gmail.com",
        //         "avatar": "https://res.cloudinary.com/djuafn5vu/image/upload/v1687462839/rsdax2rl761drfkyjyge.jpg"
        //     },
        //     {
        //         "_id": "6492006b6f1538b249f9e329",
        //         "fullname": "Ali Raza",
        //         "email": "mianraza645@gmail.com",
        //         "avatar": "https://res.cloudinary.com/djuafn5vu/image/upload/v1687462839/rsdax2rl761drfkyjyge.jpg"
        //     }
        // ]