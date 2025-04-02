const Request = require('../models/requestModel');  

// Create a new request
const createRequest = async (req, res) => {
    console.log("Received request data:", req.body);  
    const { itemId, title, room, quantity } = req.body;  

    try {
        // Create a new request document in the database, associating the user ID from the authenticated user
        const request = await Request.create({ itemId, title, room, quantity, userId: req.user._id });

        res.status(200).json(request);
    } catch (error) {
        
        res.status(400).json({ error: error.message });
    }
};

// Get all requests for the logged-in user
const getRequests = async (req, res) => {
    try {
        // Fetch all requests from the database 
        const requests = await Request.find();  

        res.status(200).json(requests);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
};

// Delete a request by its ID
const deleteRequest = async (req, res) => {
    const { id } = req.params;  

    try {
        // Try to find and delete the request by its ID
        const request = await Request.findByIdAndDelete(id);

        if (!request) {
            return res.status(404).json({ error: 'Request not found' });
        }
        
        res.status(200).json({ message: 'Request deleted successfully' });
    } catch (error) {
        
        console.error(error);
        res.status(500).json({ error: 'Failed to delete request' });
    }
};

module.exports = { createRequest, getRequests, deleteRequest };

