// mengimport mongoose
const mongoose = require("mongoose");
let db_name=process.env.DB_NAME
mongoose.connect("mongodb://localhost:27017/"+db_name, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});