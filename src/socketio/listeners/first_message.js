var Conversation = require('../../services/Conversation.Service');
const User = require('../../services/User.Service');
var { first_message } = require('../events');
module.exports = socket => {
    socket.on("FIRST_MESSAGE", async({ conversationID, users, message }) => {
        var conversation = await Conversation.createConversation(users, message);
        if (conversation) {
            await User.addConversation(conversation);
            first_message(socket, { oldID: conversationID, conversation })
        }
    })
}