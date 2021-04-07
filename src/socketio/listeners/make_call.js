const ConversationService = require('../../services/Conversation.Service');
var { have_call } = require('../events');
module.exports = socket => {
    socket.on("MAKE_CALL", async({ conversationID, peerID, isVideoCall }) => {
        var conversation = await ConversationService.getConversationById(conversationID);
        if (conversation.users.map(u => u._id).includes(socket.user._id)) {
            socket.join(conversationID);
            have_call(socket, { conversation, peerID, isVideoCall })
        }
    })
}