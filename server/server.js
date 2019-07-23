const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const socket_io = require('socket.io');

//  Routes
const index = require('./routes/index');
const bookings = require('./routes/bookings');
const driverLocation = require("./routes/driverLocation");
const drivers = require("./routes/drivers");

const app = express();
const io = socket_io();

//  View configuration
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//  Body parser settings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//  Route setup
app.use("/", index);
app.use("/api", bookings);
app.use("/api", driverLocation);
app.use("/api", drivers);

const PORT = 8080;
io.listen(app.listen(PORT, () => {
    console.log(`Server started successfully, and running on port ${PORT}`);
}));

app.io = io.on("connection", function(socket){
	console.log("Socket connected: " + socket.id);
});