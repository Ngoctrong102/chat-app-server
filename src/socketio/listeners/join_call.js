const ConversationService = require('../../services/Conversation.Service');
var { join_call } = require('../events');
module.exports = socket => {
    socket.on("JOIN_CALL", async({ conversationID, peerID }) => {
        var conversation = await ConversationService.getConversationById(conversationID);
        if (conversation.users.includes(socket.user._id)) {
            socket.join(conversation._id);
            join_call(socket, { conversationID, peerID })
        }
    })
}