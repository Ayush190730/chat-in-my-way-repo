const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {Server} = require("socket.io")

require('dotenv').config();

const userRoute = require('./routes/userRoute');
const chatRoute = require('./routes/chatRoute');
const messageRoute = require('./routes/messageRoute');


const app = express();

//Middlewares

app.use(express.json());

app.use(cors({
    origin: 'https://chat-in-my-way-repo.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    credentials: true, // If you need to send cookies or auth headers
}));


//Routes
app.use('/api/users',userRoute);
app.use('/api/chats',chatRoute);
app.use('/api/message',messageRoute);

//env
const PORT = process.env.PORT || 5001;
const uri = process.env.ATLAS_URL;

//CRUD Operations
app.get('/',(req, res) => {
      res.send("Welcome Ayush");
})
const expressServer = app.listen(PORT, ()=>{
          console.log(`Server is running at PORT ${PORT}`);
})

mongoose
.connect(uri).then(()=>{
          console.log("MongoDB Connected");
}).catch((error)=>{
          console.log("Error", error.message);
})

const io = new Server(expressServer,{ cors: 'https://chat-in-my-way-repo.vercel.app' });

let onlineUsers = [];

io.on("connection", (socket) => {
          console.log("new connection", socket.id);


// listen to a connection

          socket.on("addNewUser", (userId) => {
                    !onlineUsers.some(user => user.userId === userId) &&
                              onlineUsers.push({
                                        userId,
                                        socketId: socket.id
                              });

                 console.log("onlineUsers", onlineUsers);
                 
                 io.emit("getOnlineUsers", onlineUsers);
                 
                 
          });

// Add Message 
socket.on("sendMessage", (message) =>{
          const user = onlineUsers.find(user => user.userId === message.recipientId)

             if(user){
                 io.to(user.socketId).emit("getMessage", message);     
                 io.to(user.socketId).emit("getNotification", {
                    senderId: message.senderId,
                    isRead: false,
                    date: new Date(),
                 });     
             }
})
          
          socket.on("disconnect", ()=>{
                    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
                    
                    io.emit("getOnlineUsers", onlineUsers);

          });

          
});




