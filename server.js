const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const path = require('path');
const moment = require('moment');
const io = socketio(server, {
  allowRequest: (req, callback) => {
    const noOriginHeader = req.headers.origin === undefined;
    callback(null, noOriginHeader);
  }
});

const indexRoutes = require('./routes/index');

app.locals.moment = moment;

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  '/leaflet',
  express.static(path.join(__dirname, '/node_modules/leaflet/dist/'))
);
app.use(
  '/chart',
  express.static(path.join(__dirname, '/node_modules/chart.js/dist/'))
);
app.use(
  '/moment',
  express.static(path.join(__dirname, '/node_modules/moment/min/'))
);

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Make io accessible to our router
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Requiring routes
app.use(indexRoutes);

app.get('*', async (req, res) => {
  return res.redirect('/');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}!`));
