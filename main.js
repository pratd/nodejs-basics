const http = require('http');//require http
require('dotenv').config();
//using dotenv
const app = require('./app');
//using port
const port = process.env.PORT || 3000;
//make amiddleware and collect request
http.createServer(app.handleRequest).listen(port);