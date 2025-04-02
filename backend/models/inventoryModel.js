const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Define the schema for the 'Inventory' collection
const inventorySchema = new Schema({
    // 'title' field: Represents the title of the inventory item 
    title: {
        type: String,      
        required: true     
    },
    // 'room' field: Represents the room where the item is located 
    room: {
        type: String,      
        required: true     
    },
    // 'type' field: Represents the category of the item 
    type: {
        type: String,      
        required: true     
    },
    // 'quantity' field: Represents the number of units of this item
    quantity: {
        type: Number,      
        required: true     
    }
}, { timestamps: true })   


module.exports = mongoose.model('Inventory', inventorySchema)


