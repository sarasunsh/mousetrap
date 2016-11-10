'use strict';
import path from 'path';
import express from 'express';
const app = express();

// const env = require('path.join(rootPath, './server/env'));

// Export app
module.exports = app;

// Logging middleware
import logMiddleware from 'volleyball';
app.use(logMiddleware);

// Parsing middleware
import bodyParser from 'body-parser';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static middleware
import favicon from 'serve-favicon';
const faviconPath = path.join(__dirname, '../../public/favicon.ico');
const npmPath = path.join(__dirname, '../../node_modules');
const publicPath = path.join(__dirname, '../../public');
const browserPath = path.join(__dirname, '../../browser');

app.use(favicon(faviconPath));
app.use(express.static(npmPath));
app.use(express.static(publicPath));
app.use(express.static(browserPath));

// Routes that will be accessed via AJAX should be prepended with
// /api so they are isolated from our GET /* wildcard.
app.use('/api', require('./routes'));

/*
 This middleware will catch any URLs resembling a file extension
 for example: .js, .html, .css
 This allows for proper 404s instead of the wildcard '/*' catching
 URLs that bypass express.static because the given file does not exist.
 */
app.use(function (req, res, next) {
    if (path.extname(req.path).length > 0) {
        res.status(404).end();
    } else {
        next(null);
    }

});

const indexPath = path.join(__dirname, '../../browser/index.html');
app.get('/*', function (req, res) {
    res.sendFile(app.get(indexPath));
});

// Error catching endware.
app.use(function (err, req, res, next) {
    console.error(err, typeof next);
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});
