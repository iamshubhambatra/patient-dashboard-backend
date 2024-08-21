
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const Patient = require("../models/patient.model");
const connectionString = require("./src/enums")

// Initialize app and middleware
const app = express();
app.use(cors());
app.use(express.json());

// Creating HTTP server and setting up Socket
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",  // Allow all origins
  },
});

// Establishing MongoDB Connection
mongoose.connect(connectionString)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


// Establishing WebSocket Connection
io.on('connection', (socket) => {
  console.log('A user connected');
  // Emit the initial patient data when a client connects
  Patient.find({}).then(patients => {
    socket.emit('patients', patients);
  });

  // Handling disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});


// Starting server
const PORT = process.env.PORT || 5002;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

