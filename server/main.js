'use strict';
/* eslint-disable global-require */

const chalk = require('chalk');

// Requires in ./db/index.js -- which returns a promise that represents
// sequelize syncing its models to the postgreSQL database.
const startDb = require('./db');

// Create a node server instance
const server = require('http').createServer();

// Set up Socket.io communication
const connectSocket = function() {
    const io = require('socket.io').listen(server); // pass the server to socket.io
    io.on('connection', function (socket) {
        console.log('A new client has connected!', socket.id);

        socket.on('clicked', function () {
            console.log('Good job!');
        });

        socket.on('send:message', function(msg){
            socket.broadcast.emit('newMsg', msg)
        })

        socket.on('disconnect', function () {
            console.log('Sad to see you go');
        });
    });
}

const createApplication = function () {
    const app = require('./app');
    server.on('request', app); // Attach the Express application.
};

const startServer = function () {
    const PORT = process.env.PORT || 1337;
    server.listen(PORT, function () { //Connect server
        console.log(chalk.blue('Server started on port', chalk.magenta(PORT)));
    });
};

startDb // dbSync promise
.then(createApplication)
.then(connectSocket)
.then(startServer)
.catch(function (err) {
    console.error(chalk.red(err.stack));
    process.exit(1);
});
