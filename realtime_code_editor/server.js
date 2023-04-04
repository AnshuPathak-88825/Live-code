const express = require("express");
const ACTION = require("./src/Actions");

const app = express();
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);

const userSocketMap = {};
function getAllconnectedClients(roomId) {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId],
      };
    }
  );
}
io.on("connection", (socket) => {
  console.log("socket connected", socket.id);
  socket.on(ACTION.JOIN, ({ roomId, Username }) => {
    userSocketMap[socket.id] = Username;
    socket.join(roomId);
    const clients = getAllconnectedClients(roomId);
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(ACTION.JOINED, {
        clients,
        Username,
        socketid: socket.id,
      });
    });
    socket.on("disconnecting", () => {
      const rooms = [...socket.rooms];
      rooms.forEach((roomId) => {
        socket.in(roomId).emit(ACTION.DISCONNECTED, {
          socketId: socket.id,
          username: userSocketMap[socket.id],
        });
      });
      delete userSocketMap[socket.id];
      socket.leave();
    });
  });
  socket.on(ACTION.CODE_CHANGE, ({ roomId, value }) => {
    console.log(value)
    io.to(roomId).emit(ACTION.CODE_CHANGE,{
      value
    })
  });
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server starting at ${PORT}`);
});
