const event = io => async(socket, { conversationID, peerID }) => {
    socket.to(conversationID).emit('JOIN_CALL', { peerID });
}

module.exports = event;