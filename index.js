const express = require('express');
const app = express();
const Chat = require('./models/chats.js');
const methodOverride = require('method-override');
// mongoose file requre
const mongoose = require('mongoose');
main()
    .then(() => { console.log("connection successful"); })
    .catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

const port = 8080;
const path = require('path');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// listen 
app.listen(port, () => {
    console.log("Server was started at", port);
});


app.get("/", (req, res) => {
    res.send("working well");
})

// index route for all

app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    // console.log(chats);
    res.render("index.ejs", { chats });

});

// new route 

app.get('/chats/new', (req, res) => {
    res.render("new.ejs");
});



// create new route by post



app.post("/chats", (req, res) => {
    let { from, to, msg } = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date(),
    });
    newChat
        .save()
        .then((res) => console.log("data was save successfully"))
        .catch((err) => console.log(err));

    res.redirect("/chats");

});

// edit route

app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", { chat });

})

// update route 

app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let { msg: newMsg } = req.body;
    // console.log(newMsg);
    let updatedChat = await Chat.findByIdAndUpdate(id, { msg: newMsg }, { runValidators: true });
    console.log(updatedChat);
    res.redirect("/chats");
})

// delete route and destroy route

app.delete("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    console.log("chat was deleted")
    res.redirect("/chats");
})




// what we can create in this system => basic chats in whatsapp

// insert data

// Chat.insertOne({
//     from: "neha",
//     to: "priya",
//     msg: "send me your omr sheet",
//     created_at: new Date(),
// })
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err));


