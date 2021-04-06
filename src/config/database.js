const mongoose = require('mongoose');
// process.env.DB_URL = "mongodb+srv://ngoctrong102:v.n.t.12345@cluster0.3gm6d.mongodb.net/Chat-app?retryWrites=true&w=majority";
var DB_URL = process.env.DB_URL;
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => {
        console.log("Connect database successfully")
    })
    .catch(err => {
        console.error(err);
    });

module.exports = mongoose.connection;