const router = require('express').Router()
const auth = require("../middleware/auth")
const activityCtrl = require("../controllers/activitesCtrl")

router.post('/activity/create', auth, activityCtrl.createActivity)
router.post('/activity/delete', auth, activityCtrl.deleteActivity)
router.get('/activity/all', auth, activityCtrl.getActivities)
router.post('/activity', auth, activityCtrl.updateActivity)
router.post('/activity/info', auth, activityCtrl.getEventDetails)

module.exports = router