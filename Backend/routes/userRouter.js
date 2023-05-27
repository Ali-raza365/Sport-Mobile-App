const router = require('express').Router()
const auth = require("../middleware/auth")
const userCtrl = require("../controllers/userCtrl")


router.get('/user/all', auth, userCtrl.getUsers)
router.post('/user', auth, userCtrl.updateUser)
router.get('/user/info', auth, userCtrl.getUserInfo)

module.exports = router