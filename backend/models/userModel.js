const mongoose = require('mongoose')   
const bcrypt = require('bcrypt')       
const validator = require('validator') 

const Schema = mongoose.Schema

const userSchema = new Schema({
    // 'email' field: Unique email address for the user
    email: {
        type: String,      
        required: true,    
        unique: true       
    },
    // 'password' field: The user's password, stored as a hashed string
    password: {
        type: String,      
        required: true     
    }
})

// Static method for user signup
userSchema.statics.signup = async function(email, password) {

    // Validate inputs
    if (!email || !password) {
        throw Error('All fields must be filled') 
    }

    // Validate email format
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid') 
    }

    // Validate password strength
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough') 
    }

    // Check if the email is already in use
    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use') 
    }

    // Hash the password before saving it to the database
    const salt = await bcrypt.genSalt(10)        
    const hash = await bcrypt.hash(password, salt) 

    // Create a new user with the email and hashed password
    const user = await this.create({ email, password: hash })

    return user 
}

// Static method for user login
userSchema.statics.login = async function(email, password) {
    // Validate inputs
    if (!email || !password) {
        throw Error('All fields must be filled') 
    }

    // Find the user by email
    const user = await this.findOne({ email })

    if (!user) {
        throw Error('Incorrect email') 
    }

    // Compare the provided password with the stored hashed password
    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect password') // 
    }

    return user 
}

module.exports = mongoose.model('User', userSchema)
