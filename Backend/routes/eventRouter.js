const router = require('express').Router()
const auth = require("../middleware/auth")
const eventCtrl = require("../controllers/eventCtrl")
const uploadToCloudinary = require('../middleware/uploadToCloudinary')

router.post('/event/create', auth, uploadToCloudinary, eventCtrl.createEvent)
router.get('/event/all', auth, eventCtrl.getEvents)
router.post('/event', auth, eventCtrl.updateEvent)
router.post('/event/info', auth, eventCtrl.getEventDetails)
router.get('/event/byid', auth, eventCtrl.getEventById)
router.post('/event/delete', auth, eventCtrl.deleteEvent)
router.post('/event/location', auth, eventCtrl.getEventsByLocation)
router.get('/event/activity', auth, eventCtrl.getEventByActivity)
router.post('/event/recommended', auth, eventCtrl.getRecommendedEvent)
router.get('/event/search', auth, eventCtrl.searchEvent)





module.exports = router