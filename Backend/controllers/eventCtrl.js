
const { CheckEvents } = require('../middleware/events');
const Event = require('../models/eventModel');
const User = require('../models/userModel');


const eventCtrl = {
    createEvent: async (req, res) => {
        try {
            const currentdate = new Date();
            const { organizer, activity, title, description, max_participants, date, time, location } = req.body
            const loc = {
                name: 'Sample 5 Location',
                coordinates: [
                    30.443902444762696, -84.27326978424058
                ]
            } //!!location ? JSON.parse(location) : null
            const act = {
                name: 'Yoga',
                activity_id: '64726219c05329af74705321'
            }


            //!!activity ? JSON.parse(activity) : null
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
            const events = await Event.find({}).sort({ createdAt: -1 })
            if (!events) return res.status(400).json({ msg: "events does not found" })
            const eventList = await CheckEvents(events, req?.user?._id)
            res.json({ events: eventList })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getEventDetails: async (req, res) => {
        const { event_id } = req.body
        try {
            const event = await Event.findById(event_id)
                .populate('participants', 'fullname email avatar')
                .populate('favorites', 'fullname email avatar')
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
            const {
                event_id,
                organizer,
                image,
                title,
                description,
                participants,
                date,
                time,
                location } = req.body
            if (!event_id) return res.status(400).json({ msg: "Event not found" })

            let updatedEvent = await Event.findOneAndUpdate({ _id: event_id }, {
                organizer,
                image,
                title,
                description,
                participants,
                date,
                time,
                location,
            }, { new: true })
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

        if (isNaN(longitude) || isNaN(latitude)) {
            return res.status(400).json({ message: 'Invalid coordinates' });
        }
        try {
            const events = await Event
                .find({
                    location: {
                        $near: {
                            $geometry: {
                                type: "Point",
                                coordinates: [longitude, latitude],
                            },
                            $maxDistance: (radiusInKm * 10000),
                        },
                    },
                }).sort({ createdAt: 1 })


            if (!events) return res.status(400).json({ msg: "No events found!" })
            const eventList = await CheckEvents(events, req?.user?._id)
            res.json({ events: eventList })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }


    },
    getEventNearMe: async (req, res) => {
        const radiusInKm = req.body.radius || 5;
        const longitude = parseFloat(req.body.longitude);
        const latitude = parseFloat(req.body.latitude);

        if (isNaN(longitude) || isNaN(latitude)) {
            return res.status(400).json({ message: 'Invalid coordinates' });
        }
        try {
            const events = await Event
                .find({
                    location: {
                        $near: {
                            $geometry: {
                                type: "Point",
                                coordinates: [longitude, latitude],
                            },
                            $maxDistance: (radiusInKm * 10000),
                        },
                    },
                }).sort({ createdAt: -1 })

            if (!events) return res.status(400).json({ msg: "No events found!" })
            const eventList = await CheckEvents(events, req?.user?._id)
            res.json({ events: eventList })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getRecommendedEvent: async (req, res) => {
        console.log(req.body);
        const radiusInKm = req.body.radius || 5;
        const longitude = parseFloat(req.body.longitude);
        const latitude = parseFloat(req.body.latitude);

        if (isNaN(longitude) || isNaN(latitude)) {
            return res.status(400).json({ message: 'Invalid coordinates' });
        }
        try {
            const events = await Event
                .find({
                    location: {
                        $near: {
                            $geometry: {
                                type: "Point",
                                coordinates: [longitude, latitude],
                            },
                            $maxDistance: (radiusInKm * 10000),
                        },
                    },
                }).sort({ participants: -1 }).limit(10)
            if (!events) return res.status(400).json({ msg: "No events found!" })
            const eventList = await CheckEvents(events, req?.user?._id)
            res.json({ events: eventList })
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
                        $maxDistance: radiusInKm * 1000, // Convert km to meters
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

            // if (!events || events.length === 0) {
            //     return res.status(400).json({ msg: "No events found!" });
            // }

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
            const user = await User.findById(userId).populate('favorites');
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const favoriteEvents = user.favorites;
            return res.json({ favoriteEvents });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    addParticipant: async (req, res) => {
        const { event_id } = req.body;
        try {
            if (!req.user._id) return res.status(400).json({ msg: "invalid Token!" })
            const userId = req.user._id

            const event = await Event.findById(event_id);
            if (!event) {
                return res.status(500).json({ message: 'Event not found' });
            }

            if (event.total_participants >= event.max_participants) {
                return res.status(500).json({ message: "Maximum number of participants reached" });
            }
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
            event.total_participants = event.participants.length;
            if (!event) {
                return res.status(404).json({ message: 'Event not found' });
            }

            res.json({ message: 'Event removed from favorites' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    getEventsByuserParticipant: async (req, res) => {
        try {
            if (!req.user._id) return res.status(400).json({ msg: "invalid Token!" })
            const userId = req.user._id
            const events = await Event.find({ participants: { $in: [userId] } })

            if (!events) {
                return res.status(404).json({ message: 'Events not found' });
            }
            return res.json({ events });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
}
module.exports = eventCtrl
