const router = require('express').Router()
const auth = require("../middleware/auth")
const eventCtrl = require("../controllers/eventCtrl")
const uploadToCloudinary = require('../middleware/uploadToCloudinary')

router.post('/event/create', auth, uploadToCloudinary, eventCtrl.createEvent)
router.get('/event/all', auth, eventCtrl.getEvents)
router.post('/event/near-me', auth, eventCtrl.getEventNearMe)
router.post('/event', auth, eventCtrl.updateEvent)
router.post('/event/info', auth, eventCtrl.getEventDetails)
router.get('/event/byid', auth, eventCtrl.getEventById)
router.post('/event/delete', auth, eventCtrl.deleteEvent)
router.post('/event/location', auth, eventCtrl.getEventsByLocation)
router.get('/event/activity', auth, eventCtrl.getEventByActivity)
router.post('/event/recommended', auth, eventCtrl.getRecommendedEvent)
router.get('/event/search', auth, eventCtrl.searchEvent)
router.post('/event/add-to-favorites', auth, eventCtrl.addToFavourite)
router.post('/event/remove-to-favorites', auth, eventCtrl.removeToFavourite)
router.get('/event/all-favorites', auth, eventCtrl.getAllFavouriteByuser)
router.post('/event/add-participant', auth, eventCtrl.addParticipant)
router.post('/event/remove-participant', auth, eventCtrl.removeParticipant)
router.get('/event/participant', auth, eventCtrl.getEventsByuserParticipant)





module.exports = router