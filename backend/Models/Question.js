const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, required: true },
    content: { type: String },
    options: [String], // Used for MCQs
    correctAnswer: String, // For MCQs and other question types
});

module.exports = mongoose.model('Question', questionSchema);
