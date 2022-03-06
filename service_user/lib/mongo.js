const mongoose = require('mongoose');
require('dotenv').config();

const db_url="mongodb://rozaq:rozaq@cluster0-shard-00-00.eeeka.mongodb.net:27017,cluster0-shard-00-01.eeeka.mongodb.net:27017,cluster0-shard-00-02.eeeka.mongodb.net:27017/db_abdul_rozaq_betest?replicaSet=atlas-nm186a-shard-0&ssl=true&authSource=admin"
// process.env.DB_URL;
mongoose.connect(db_url, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
    console.log(`Not Connected !!! ->  ${err.message}`);
});
