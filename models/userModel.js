const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the use name."]
    },
    email: {
        type: String,
        required: [true, "Please add the user email address."],
        unique: [true, "User email already in use."]
    },
    password: {
        type: String,
        required: [true, "PLease add a password"]
    }
},{
    timestamps: true
});

module.exports = mongoose.model('user', userSchema);