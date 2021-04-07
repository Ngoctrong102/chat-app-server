var request = require('request');
module.exports = {
    getICEServer: (req, res) => {
        // Node Get ICE STUN and TURN list
        let o = {
            format: "urls"
        };

        let bodyString = JSON.stringify(o);
        let options = {
            url: 'https://global.xirsys.net/_turn/chat-app',
            method: "PUT",
            headers: {
                "Authorization": "Basic " + Buffer.from("ngoctrong102:0cf4ad32-95e2-11eb-9c2d-0242ac150002").toString("base64"),
                "Content-Type": "application/json",
                "Content-Length": bodyString.length
            }
        };
        request(options, function(error, response, body) {
            if (error) console.error('error:', error);
            res.json(JSON.parse(body).v.iceServers);
        });
    }
}