const UserService = require("../../services/User.Service");
const people = require("../people");

const event = io => async(socket, data) => {
    var from = await UserService.findUser(data.from);
    var to = await UserService.findUser(data.to);
    people[data.to].forEach(socketID => {
        io.to(socketID).emit("ACCEPT_REQ_FRIEND", {
            friend: from
        })
    });
    people[data.from].forEach(socketID => {
        io.to(socketID).emit("ACCEPT_REQ_FRIEND", {
            friend: to
        })
    });
}
module.exports = event;