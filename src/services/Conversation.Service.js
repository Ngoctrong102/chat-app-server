const Conversation = require("../models/Conversation.Model");
const User = require("../models/User.Model");

class ConversationService {
    async getConversation(users) {
        users.sort();
        var conversation = await Conversation.findOne({ users })
            .populate('users', ['_id', 'username', 'avatar'])
            .populate('messages.user', ['_id', 'username', 'avatar'])
        if (conversation) return conversation;
        else {
            return {
                _id: 'NOT_EXIST' + users.join(''),
                users: await User.find({
                    _id: { $in: users }
                }, ['username', 'avatar', '_id']),
                messages: []
            }
        }


    }
    async createConversation(users, message) {
        users.sort();
        var conversation = await Conversation({ users, messages: [message] }).save();
        conversation = await conversation.populate('users', ['_id', 'username', 'avatar']).populate('messages.user', ['_id', 'username', 'avatar']).execPopulate();
        return conversation;
    }
    async addNewMessage(conversationID, message) {
        var res = await Conversation.updateOne({ _id: conversationID }, { $push: { messages: message } });
        return res.nModified ? true : false;
    }
    async membersOf(conversationID) {
        var res = await Conversation.findOne({ _id: conversationID }, 'users');
        return res ? res.users : false;
    }
    async getConversationById(id) {
        return await (await Conversation.findById(id).select(['users', '_id']).populate('users', ['_id', 'username', 'avatar'])).execPopulate();
    }
}

module.exports = new ConversationService();