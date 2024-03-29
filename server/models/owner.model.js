const mongoose = require('mongoose');

const OwnerSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    phone: {
        type: String,
        required: true,
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    }],

}, { timestamps: true });

const Owner = mongoose.model('Owner', OwnerSchema);

module.exports = { Owner };