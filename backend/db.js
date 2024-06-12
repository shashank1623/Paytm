// We need to support 3 routes for user authentication
// Allow user to sign up.
// Allow user to sign in.
// Allow user to update their information (firstName, lastName, password).
 
// To start off, create the mongo schema for the users table
// Create a new file (db.js) in the root folder
// Import mongoose and connect to a database of your choice
// Create the mongoose schema for the users table 
// Export the mongoose model from the file (call it User)

const mongoose = require('mongoose');
mongoose.connect('your_mongo_url');

// simple way to create schema
// const userSchma = new mongoose.Schema({
//     username : String,
//     password : String,
//     firstName : String,
//     lastName : String
// })
// Elegant way to create schema
const userSchema  = new mongoose.Schema({
    username :{
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true,
        minLength : 4,
        maxLength : 60
    },
    password : {
        type : String,
        required : true,
        minLength : 6,
    },
    firstName : {
        type : String,
        required : true,
        trim : true,
        maxLength : 50
    },
    lastName : {
        type : String,
        required : true,
        trim : true,
        maxLength : 50
    }
})

const accountSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId, //refers to the user schema
        ref : 'User',
        required : true
    },
    balance : {
        type : Number,
        required : true
    }

})

// create a model from the schema
const User = mongoose.model('User', userSchema)
const Account = mongoose.model('Account', accountSchema)

//export the user schema
module.exports = {
    User,
    Account
}