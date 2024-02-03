//importing express
const express = require("express");

const app = express();
//importing http module
const http = require("http");
//destructuring server object from socket.io library and import it
const { Server } = require("socket.io");
//importing cors
const cors = require("cors");

//server make use of cors
app.use(cors());

//creating server
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },

});
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("joinroom", (data) => {
    socket.join(data);

    console.log(`User with ID : ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(3002, () => {
  console.log("SERVER IS RUNNING");
});