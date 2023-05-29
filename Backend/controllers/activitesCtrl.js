const Activity = require('../models/sportActivitesModal')


const activityCtrl = {
    createActivity: async (req, res) => {
        try {
            const { name } = req.body
            if (!req.user._id) return res.status(400).json({ msg: "invalid Token!" })
            const newActivity = new Activity({ name })

            await newActivity.save()

            res.json({
                msg: 'Sport Activity Created Successfully!',
                SportActivity: {
                    ...newActivity._doc,
                }
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteActivity: async (req, res) => {
        try {
            const { activity_id } = req.body
            if (!activity_id) return res.status(400).json({ msg: "activity not Found" })
            await Activity.findByIdAndDelete({ _id: activity_id })

            res.json({
                msg: 'Sport Activity Deleted Successfully!',

            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getActivities: async (req, res) => {
        try {
            const activities = await Activity.find({}).sort({ createdAt: -1 })
            if (!activities) return res.status(400).json({ msg: "sport activites not found" })
            res.json({ activities })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getEventDetails: async (req, res) => {
        const { activity_id } = req.body
        try {

            const activty = await Activity.findById(activity_id)
            if (!activty) return res.status(400).json({ msg: "Sport activty not found" })
            res.json({ activty })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateActivity: async (req, res) => {
        try {
            const { name, activity_id } = req.body
            if (!activity_id) return res.status(400).json({ msg: "Sport Activity not found" })

            let updatedActivity = await Activity.findOneAndUpdate({ _id: activity_id }, { name }, { new: true })
            res.json({ msg: "Update Success!", Activity: updatedActivity })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}
module.exports = activityCtrl
