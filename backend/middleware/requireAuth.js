const jwt = require('jsonwebtoken')  
const User = require('../models/userModel')  

// Middleware function to verify authentication
const requireAuth = async (req, res, next) => {

    // Extract the 'Authorization' header from the incoming request
    const { authorization } = req.headers

    // Check if the authorization header is present
    if (!authorization) {
        return res.status(401).json({error: 'Authorization token required'})
    }

    // Extract the token from the Authorization header, assuming the format is 'Bearer <token>'
    const token = authorization.split(' ')[1]  

    try {
        // Verify the token using the SECRET stored in the environment variables
        const {_id} = jwt.verify(token, process.env.SECRET)

        // Find the user based on the verified _id from the token
        req.user = await User.findOne({ _id }).select('_id')  

        // Proceed to the next middleware or route handler
        next()

    } catch (error) {
        console.log(error)  
        res.status(401).json({error: 'Request is not authorized'})
    }
}

module.exports = requireAuth
