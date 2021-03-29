const people = require("../people");

const event = io => (socket, data) => {
    if (people[data.to])
        people[data.to].forEach(socketID => {
            io.to(socketID).emit("REQ_ADD_FRIEND", {
                req: {
                    from: data.from
                }
            })
        });
}
module.exports = event;