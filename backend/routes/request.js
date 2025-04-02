const express = require('express');  
const { createRequest, getRequests, deleteRequest } = require('../controllers/requestController'); 
const requireAuth = require('../middleware/requireAuth'); 

// Create a new Express router instance
const router = express.Router();  

// Use authentication middleware to protect the routes
router.use(requireAuth);  

// Route to add a new request
router.post('/', createRequest);

 // Route to get all requests
router.get('/', getRequests);  

// Route to delete a request by ID
router.delete('/:id', deleteRequest);  

module.exports = router; 

