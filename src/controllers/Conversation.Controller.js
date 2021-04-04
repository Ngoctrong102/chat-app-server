const ConversationService = require("../services/Conversation.Service");

module.exports = {
    getConversation: async(req, res) => {
        var users = req.body.users;
        var conversation = await ConversationService.getConversation(users);
        res.json(conversation);
    }
}