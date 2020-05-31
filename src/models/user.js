const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("User", fileSchema);