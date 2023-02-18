const mongoose = require("mongoose");

const username = "academypurpose";
const password = "1234567890";
const cluster = "cluster0.ri2w0";
const dbname = "parkingmanagement";

mongoose.connect(
  `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`, 
  {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true
  }
);
const db = mongoose.connection;
module.exports = db;