const Conversation = require("../models/Conversation.Model");
const User = require("../models/User.Model");

class ConversationService {
    async getConversation(userID, friendID) {
        var conversation = await Conversation.findOne({
                $or: [
                    { users: [userID, friendID] },
                    { users: [friendID, userID] }
                ]
            })
            .populate('users', ['_id', 'username', 'avatar'])
            .populate('messages.user', ['_id', 'username', 'avatar'])
        if (conversation) return conversation;
        else {
            return {
                _id: 'NOT_EXIST' + userID + friendID,
                users: await User.find({
                    $or: [
                        { _id: userID },
                        { _id: friendID }
                    ]
                }, ['username', 'avatar', '_id']),
                messages: []
            }
        }


    }
    async createConversation(users, message) {
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
}

module.exports = new ConversationService();