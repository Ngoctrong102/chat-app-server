var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    email: { type: String, require: true, unique: true },
    username: { type: String, require: true },
    password: { type: String, require: true },
    avatar: { type: String, default: 'avt-default.jpg' },
    friends: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], default: [] },
    reqFriends: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], default: [] },
    conversations: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' }], default: [] }
})


module.exports = mongoose.model('User', UserSchema);