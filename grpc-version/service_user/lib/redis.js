require('dotenv').config();

const redis = require('redis');
const client = redis.createClient({
    url:process.env.REDIS_URL
});
client.connect();

client.on('connect', function() {
    console.log('Connected!');
  });
client.on('error', err => {
    console.log('Not Coonected Error ' + err);
});

module.exports = client;

