var UserService = require('../../services/User.Service');
const { accept_req_friend } = require('../events');
module.exports = socket => {
    socket.on("ACCEPT_REQ_FRIEND", async(data) => {
        try {
            var respone = await UserService.addFriend(data.from, data.to);
            if (respone)
                accept_req_friend(socket, data);
        } catch (err) {
            console.log(err);
        }
    })
}