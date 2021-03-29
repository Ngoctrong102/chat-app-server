var Conversation = require('../../services/Conversation.Service');
var people = require('../people');

const event = io => async(socket, { conversationID, message }) => {
    var users = await Conversation.membersOf(conversationID);
    // console.log(users, Array(users));
    // for (var u of users) {
    // if (u._id==message.user._id){
    // var id = u._id.toString();
    // console.log(u._id, id);
    users.forEach(u => {
        if (people[u._id])
            people[u._id].forEach(socketId =>
                io.to(socketId).emit('NEW_MESSAGE', {
                    conversationID,
                    message
                }))
            // })
    })

}

module.exports = event;