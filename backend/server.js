require('dotenv').config()

const cors = require("cors")
const express = require('express') 
const inventoryRoutes = require('./routes/inventory') 
const userRoutes = require('./routes/user') 
const mongoose = require('mongoose') 
const request = require('./routes/request');

const app = express()

app.use(cors({
    origin: "https://simmer-frontend.netlify.app", 
    methods: "GET,POST,PATCH,DELETE", 
    credentials: true 
}))
// Middleware to parse incoming JSON requests
app.use(express.json())

// Custom middleware for logging incoming requests' paths and methods
app.use((req, res, next) => {
    console.log(req.path, req.method) 
    next() 
})

// Define routes for inventory and user management
app.use('/api/inventory', inventoryRoutes) 
app.use('/api/user', userRoutes) 
app.use('/api/requests', request)

mongoose.connect(process.env.MONGO_URI) 
    .then(() => {
        // Once connected to the database, start the server on the specified port
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

