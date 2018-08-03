const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Client = require('./Client');

var EmployeeSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        trim: true
    },
    rate: {
        type:Number,
        required:true
    },
    hired: {
        type: Date,
        default: Date.now()
    },
    clients: [Client],
    active:{
        type: Boolean,
        default: true
    },
    position: {
        type: String,
        required: true
    },
    annualEarningInCash: {
        type: Number,
        default: 0
    },
    annualEarningOnCard: {
        type: Number,
        default: 0
    },
    phone: String,
    comments: String,
    tip: Number,
    ssn: Number,
    email: {
        type: String,
        trim: true
    },
    added: {
        type: Date,
        default: Date.now()
    },
    _user: {type: Schema.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model("employee", EmployeeSchema);

