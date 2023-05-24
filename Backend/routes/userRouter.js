const router = require('express').Router()
const auth = require("../middleware/auth")
const userCtrl = require("../controllers/userCtrl")


router.get('/search', auth, userCtrl.searchUser)

// router.get('/user/:id', auth, userCtrl.getUser)
router.get('/user/all', auth, userCtrl.getUsers)

router.post('/user', auth, userCtrl.updateUser)

module.exports = router