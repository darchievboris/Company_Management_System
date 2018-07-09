var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        trim: true
    },
    lastName: String, 
    email: {
        type: String,
        trim: true
    },
    start: String,
    end: String,
    jobLength: Number,
    sameDay: String,
    wholeDay: Boolean,
    phone: String,
    notes: String,
    addressFrom:{
        street: String,
        city: String,
        state: String,
        zip: String,
        notes: String
    },
    addressTo:{
        street: String,
        city: String,
        state: String,
        zip: String,
        notes: String
    },
    added: {
        type: Date,
        default: Date.now()
    },
    _user: {type: Schema.Types.ObjectId, ref: 'User'}
})

 module.exports = mongoose.model("client", ClientSchema);

