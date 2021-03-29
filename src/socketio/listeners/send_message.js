var Conversation = require('../../services/Conversation.Service');
var { send_message } = require('../events');
module.exports = socket => {
    socket.on("SEND_MESSAGE", async({ conversationID, message }) => {
        var res = await Conversation.addNewMessage(conversationID, message);
        // req_add_friend(socket, data);
        // console.log(data);
        send_message(socket, { conversationID, message })
    })
}