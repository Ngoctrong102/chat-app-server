var people = require('../people');

const event = io => async(socket, { oldID, conversation }) => {
    conversation.users.forEach(u => {
        if (people[u._id])
            people[u._id].forEach(socketId =>
                io.to(socketId).emit('FIRST_MESSAGE', {
                    oldID,
                    conversation
                }))
    })

}

module.exports = event;