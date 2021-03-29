var UserService = require('../../services/User.Service');
var { req_add_friend } = require('../events');
module.exports = socket => {
    socket.on("REQ_ADD_FRIEND", (data) => {
        UserService.reqFriend(data.from, data.to);
        req_add_friend(socket, data);
    })
}