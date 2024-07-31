const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true, 
    },
    status: {
        type: String,
        default: 'Pending' 
    },
    date: {
        type: Date,
        default: Date.now
    },
    deadline: {
        type: Date,
    },
    priority: {
        type: String,
    }
  });

  module.exports = mongoose.model('notes', NotesSchema);
