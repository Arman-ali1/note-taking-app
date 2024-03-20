import express from 'express';
import cors from 'cors';
import http from 'http';
import {Server} from "socket.io"
import dbconn from './src/db/dbconn.js';
import Chat from './src/module/chat.module.js';
import dotenv from"dotenv" 


dotenv.config({path:"./.env"});
const app = express();
dbconn()
const server = http.createServer(app)

app.use(cors({
  origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const io=new Server(server,{
  cors:{
    origin:"http://localhost:5173",
    methods:["GET","POST"]
  },

})


io.on("connection",(socket)=>{
    console.log(`User Connected: ${socket.id}`);

    socket.on("all-message", async(data)=>{
      console.log("all message");
      const getAllChat=await Chat.find();
      // console.log(getAllChat);
      socket.emit("receive_message",getAllChat)
    })

    socket.on("send_message",async(data)=>{
      // console.log(data.author);
      const author=data.author;
      const title=data.title;
      const content=data.content
      
      try {
        const newChate = new Chat({
          author,
          title,
          content
        })
        const saveChat = await newChate.save();
        console.log("Chate created");
        const getAllChat=await Chat.find();
        // console.log(getAllChat);
        socket.emit("receive_message",getAllChat)
        socket.broadcast.emit("receive_message",getAllChat)
      } catch (error) {
        console.log("error in cath ");
      }
      
    });

    /////////////////////////////////////delete
    socket.on("delete_chat",async(data)=>{
      // console.log(data)
      // console.log(data.id);
      const _id=data.id;
      try {
        const deleteChat=await Chat.findByIdAndDelete(_id);
        console.log("Chat deleted");
        const getAllChat=await Chat.find();
        // console.log(getAllChat);
        socket.emit("receive_message",getAllChat)
        socket.broadcast.emit("receive_message",getAllChat)
      } catch (error) {
        console.log("error in cath ");
      }
    
    })
    ///////////////////////update
    socket.on("update_chat",async(data)=>{
      const _id=data.id;
      const content=data.contentText;
      try {
        const updateChat=await Chat.findByIdAndUpdate(_id,
        { $set:{content}},
          {new: true}
          );
        console.log("Chat updated");
        const getAllChat=await Chat.find();
        // console.log(getAllChat);
        socket.emit("receive_message",getAllChat)
        socket.broadcast.emit("receive_message",getAllChat) 
      } catch (error) {
        console.log("error in cath ");
      }
      
    })

    
});

const PORT = process.env.PORT || 3030;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
}
);
