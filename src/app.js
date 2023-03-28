const express = require('express');
require('dotenv').config();
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');

const apiRouter = require('./routes/api.router');

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log('Database connected'))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

const corsConfig = {
  origin: '*',
};

const app = express();
const httpServer = http.createServer(app);
const io = new socketIO.Server(httpServer, {
  cors: corsConfig,
});

app.use(express.json());
app.use(cors(corsConfig));
app.use((req, res, next) => {
  req.io = io;
  next();
});

io.on('connection', (socket) => {
  socket.on('join room', (roomId) => {
    socket.join(roomId);
  });
});

app.use(express.static('public'));

app.use('/api/v1', apiRouter);

module.exports = httpServer;
