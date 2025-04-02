const Inventory = require('../models/inventoryModel')  
const mongoose = require('mongoose')  

// Get all items in the inventory
const getItems = async (req, res) => {
    // Fetch all items from the Inventory collection, sorted by creation date in descending order
    const items = await Inventory.find({}).sort({ createdAt: -1 })

    res.status(200).json(items)
}

// Get a single item based on its ID
const getItem = async (req, res) => {
    const { id } = req.params  

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such item' })  
    }

    // Find the item by its ID in the inventory collection
    const item = await Inventory.findById(id)

    if (!item) {
        return res.status(404).json({ error: 'No such item' })
    }

    res.status(200).json(item)
}

// Create a new inventory item
const createItem = async (req, res) => {
    const { title, room, type, quantity } = req.body  

    let emptyFields = []  

    // Check if any required fields are missing
    if (!title) emptyFields.push('title')
    if (!room) emptyFields.push('room')
    if (!type) emptyFields.push('type')
    if (!quantity) emptyFields.push('quantity')

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    try {
        const inventory = await Inventory.create({ title, room, type, quantity })
        res.status(200).json(inventory)  
    } catch (error) {
        res.status(400).json({ error: error.message })  
    }
}

// Delete an item from the inventory
const deleteItem = async (req, res) => {
    const { id } = req.params  

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such item' })  
    }

    // Attempt to find and delete the item by its ID
    const item = await Inventory.findOneAndDelete({ _id: id })

    if (!item) {
        return res.status(404).json({ error: 'No such item' })
    }

    res.status(200).json(item)
}

// Update an item in the inventory
const updateItem = async (req, res) => {
    const { id } = req.params  

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such item' })  
    }

    // Attempt to find the item by ID and update it with the provided request body data
    const item = await Inventory.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!item) {
        return res.status(404).json({ error: 'No such item' })
    }

    res.status(200).json(item)
}

// Get inventory summary (total stock per room)
const getInventorySummary = async (req, res) => {
    try {
        // Use MongoDB aggregation to group items by their room and calculate the total stock for each room
        const summary = await Inventory.aggregate([
            { $group: { _id: "$room", totalStock: { $sum: "$quantity" } } } 
        ])

        res.status(200).json(summary)
    } catch (error) {
        
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getItems,
    getItem,
    createItem,
    deleteItem,
    updateItem,
    getInventorySummary
}
