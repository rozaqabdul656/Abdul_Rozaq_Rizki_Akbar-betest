require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT ;
const endpoints = require('./routes/endpoint.js');
const methodOverride = require('method-override');
app.use(methodOverride());
require('./lib/mongo');
require('./lib/redis');

endpoints(app);
app.listen(port, () => {
    console.log(`cli-nodejs-api listening at http://localhost:${port}`)
});
