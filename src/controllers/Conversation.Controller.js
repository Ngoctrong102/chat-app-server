const ConversationService = require("../services/Conversation.Service");

module.exports = {
    getConversation: async(req, res) => {
        var { userID, friendID } = {...req.query };
        var conversation = await ConversationService.getConversation(userID, friendID);
        res.json(conversation);
    }
}