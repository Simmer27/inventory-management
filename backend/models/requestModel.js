const mongoose = require('mongoose');  

// Define the schema for the "Request" collection
const requestSchema = new mongoose.Schema({
    itemId: { 
        type: mongoose.Schema.Types.ObjectId,  
        required: true  
    },
    title: { 
        type: String,  
        required: true  
    },
    room: { 
        type: String,  
        required: true  
    },
    quantity: { 
        type: Number,  
        required: true  
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId,  
        required: true,  
        ref: 'User'  
    },
}, { 
    timestamps: true  
});

module.exports = mongoose.model('Request', requestSchema);

