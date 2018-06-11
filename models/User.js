var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    googleId: String,
    firstName: {
        type: String,
        // required: true,
        minlength: 2,
        trim: true
    },
    lastName: {
        type: String,
        // required: true,
        minlength: 2,
        trim: true
    }, 
    email: {
        type: String,
        unique:true,
        trim: true
    },
    password: {
        type: String,
        // required: true,
        minlength: 6
    },
    registered: {
        type: Date,
        default: Date.now
    },
})

 module.exports = mongoose.model("users", UserSchema);

