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

    let userArr = [];
    let nextUserId = 1;
    io.on('connection', function (socket) {
        const newUser = "User "+nextUserId
        userArr.push(newUser)
        nextUserId +=1;

        // send the new user their name and a list of users
        socket.emit('init', {
            name: newUser,
            users: userArr
        });

        // notify other clients that a new user has joined
        socket.broadcast.emit('user:join', {
            name: newUser
        });

        // broadcast a user's message to other users
        socket.on('send:message', function(msg){
            socket.broadcast.emit('newMsg', msg)
        });

        // user changed their name
        socket.on('change:name', function(newName){
            socket.broadcast.emit('change:name', {oldName: newUser, newName: newName})
            const index = userArr.indexOf(newUser);
            userArr.splice(index, 1, newName);
        });

        // let other users know once a user has left
        socket.on('disconnect', function () {
            userArr = userArr.filter(name => name !== newUser);
            socket.broadcast.emit('user:left', {
                name: newUser
            });
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
