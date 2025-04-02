const express = require('express')

// Import the controller functions for inventory actions
const {
    createItem,  
    getItems,  
    getItem,  
    deleteItem,  
    updateItem,  
    getInventorySummary  
} = require('../controllers/inventoryController')


const requireAuth = require('../middleware/requireAuth')
const router = express.Router()

// Use the `requireAuth` middleware to protect all routes below
router.use(requireAuth)

// Route to GET all inventory items
router.get('/', getItems)

// Route to GET a single item by ID
router.get('/:id', getItem)

// Route to POST a new inventory item
router.post('/', createItem)

// Route to DELETE an item by ID
router.delete('/:id', deleteItem)

// Route to UPDATE an item by ID
router.patch('/:id', updateItem)

// Route to GET an inventory summary
router.get('/summary', getInventorySummary)

module.exports = router

