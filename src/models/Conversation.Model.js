var mongoose = require('mongoose');

var ConversationSchema = new mongoose.Schema({
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    messages: {
        type: [{
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            content: { type: String, require: true },
            time: { type: Date, default: new Date() }
        }],
        default: []
    }
})


module.exports = mongoose.model('Conversation', ConversationSchema);