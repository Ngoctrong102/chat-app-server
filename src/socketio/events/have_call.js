const UserService = require('../../services/User.Service');
var people = require('../people');

const event = io => async(socket, { conversation, isVideoCall }) => {
    var user = socket.user;
    conversation.users.forEach(u => {
        if (!u._id.equals(user._id) && people[u._id]) {
            people[u._id].forEach(socketID => {
                io.to(socketID).emit('HAVE_CALL', { conversationID: conversation._id, isVideoCall })
            })
        }
    })

}

module.exports = event;