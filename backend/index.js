import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
import morgan from 'morgan';
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const userSocketMap = {}; // which user has socket id what

function getAllConnectedClients(roomId) {
  // among all the rooms on your socket server this returns a room with your roomId
  // Map will be here if room is present else give empty array Array.from is used to create the map to array.
  // gives array with all the clients
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId],
      };
    }
  );
}

io.on('connection', (socket) => {
  // console.log('Socket connected', socket.id);
  socket.on('join', ({ roomId, username }) => {
    // store key as socket id and username as value of userSocketMap object
    userSocketMap[socket.id] = username;
    // console.log(roomId, username);
    // creates a new room for a client if no one is present in that socket
    socket.join(roomId);

    // if others are present we need list of clients in the current socket
    const clients = getAllConnectedClients(roomId);

    clients.forEach(({ socketId }) => {
      io.to(socketId).emit('joined', {
        clients,
        username,
        socketId: socket.id,
      });
    });
  });

  socket.on('code-change', ({ roomId, code }) => {
    socket.in(roomId).emit('code-change', { code });
  });

  socket.on('sync-code', ({ socketId, code }) => {
    io.to(socketId).emit('sync-code', { code });
  });

  // if clients changes tab, or closes page this event is fired not disconnect its disconnecting
  socket.on('disconnecting', () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit('disconnected', {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
    });
    delete userSocketMap[socket.id];
    socket.leave();
  });
});

app.use(express.json());
app.use(cors());

app.use('/api/user', userRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    server.listen(process.env.PORT, () =>
      console.log(`Connected to DB and server running at ${process.env.PORT}`)
    );
  })
  .catch((err) => console.log(err.message));
