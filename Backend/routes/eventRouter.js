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


module.exports = router