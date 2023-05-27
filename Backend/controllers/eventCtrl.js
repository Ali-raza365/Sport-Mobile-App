const Event = require('../models/eventModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const eventCtrl = {
    createEvent: async (req, res) => {
        try {
          
            
            const { organizer,image,title,description,participants,date,time,location} = req.body

            if (!req.user._id) return res.status(400).json({ msg: "invalid Token!" })
        
            const newEvent = new Event({organizer,title,description,participants,date,time,location,
                createdBy:req.user._id,
                image:req?.imageUrl|| '',
            })

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
            if (!events) return res.status(400).json({ msg: "User does not exist." })
            res.json({ events })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getEventDetails:async (req, res) => {
        const {event_id} =req.body
        try {

            const event = await Event.findById(event_id)
            if (!event) return res.status(400).json({ msg: "Event not found" })
            res.json({ event })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getEventById:async (req, res) => {
        try {

            const events = await Event.find({createdBy:req.user._id})
            if (!events) return res.status(400).json({ msg: "No events found!" })
            res.json({ events })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateEvent:async (req, res) => {
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
                location} = req.body
            if (!event_id) return res.status(400).json({ msg: "Event not found" })

        let updatedEvent =  await Event.findOneAndUpdate({ _id:event_id}, {
            organizer,
            image,
            title,
            description,
            participants,
            date,
            time,
            location,
            },{ new: true })
            res.json({ msg: "Update Success!",event:updatedEvent })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}
module.exports = eventCtrl
