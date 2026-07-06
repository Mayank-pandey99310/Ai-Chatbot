require("dotenv").config()
const cors = require("cors")
const app = require("./src/app")
const { createServer } = require("http");
const { Server } = require("socket.io");
const getChat = require("./src/services/ai.service");
const { text } = require("stream/consumers");

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });



io.on("connection", (socket) => {
  console.log(`${socket.id} user connected`)
  
  let lastInteractionId = null
  socket.on("user_message",async(message)=>{
    console.log("message recieved")
    const responce = await getChat(message,lastInteractionId)
    lastInteractionId = responce.id
    socket.emit("ai-response",responce.text)
    console.log("ai respond",responce.text)
  })

  socket.on("disconnect",()=>{
      console.log(`${socket.id} user disconnected`)

  })
});

httpServer.listen(3000);