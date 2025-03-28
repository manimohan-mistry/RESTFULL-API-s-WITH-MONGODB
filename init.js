// This is data insertion file to the database 

const mongoose = require('mongoose');
const Chat = require('./models/chats.js');
main()
    .then(() => { console.log("connection successful"); })
    .catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

Chat.insertMany([
    {
        from: "rohit",
        to: "suman",
        msg: "send me your number sheet",
        created_at: new Date(),
    },
    {
        from: "rohini",
        to: "sammy",
        msg: "send me your details",
        created_at: new Date(),
    },
    {
        from: "sakshi",
        to: "bhanjan",
        msg: "can you send me our shirt size plz",
        created_at: new Date(),
    },
    {
        from: "malo",
        to: "eyalu",
        msg: "I am stucke in coding",
        created_at: new Date(),
    }
])
    .then((res) => console.log(res))
    .catch((err) => console.log(err));