const mongoose = require('mongoose');
require('dotenv').config();

const db_url=process.env.DB_URL;
// 
mongoose.connect(db_url, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
    console.log(`Not Connected !!! ->  ${err.message}`);
});
