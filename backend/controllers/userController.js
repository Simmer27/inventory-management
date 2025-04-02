const User = require('../models/userModel')  
const jwt = require('jsonwebtoken')  

// Helper function to create a JWT token
const createToken = (_id) => {
    // Generate a token with the user's _id and a secret key, token expires in 3 days
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// Login user
const loginUser = async (req, res) => {
    const {email, password} = req.body  
    
    try {
        // Attempt to log in the user with the provided credentials
        const user = await User.login(email, password)

        // If successful, create a token
        const token = createToken(user._id)

        // Send the token and email back in the response
        res.status(200).json({email, token})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Signup user
const signupUser = async (req, res) => {
    const {email, password} = req.body  

    try {
        // Attempt to sign up the user (creating a new user in the database)
        const user = await User.signup(email, password)

        // If successful, create a token
        const token = createToken(user._id)

        // Send the token and email back in the response
        res.status(200).json({email, token})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { signupUser, loginUser }
