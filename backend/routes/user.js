const express = require('express')
const { signupUser, loginUser } = require('../controllers/userController')

// Create a new Express router instance
const router = express.Router()

// POST route for user login
router.post('/login', loginUser)

// POST route for user signup
router.post('/signup', signupUser)

module.exports = router
