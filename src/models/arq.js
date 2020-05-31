const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    userId: String,
    name: String,
    size: Number,
    key: String,
    arquivo: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Files", fileSchema);