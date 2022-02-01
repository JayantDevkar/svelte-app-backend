const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });
const mnguri = require("../mongoURL");

mongoose.connect(mnguri.mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{console.log("DB CONNECTED ")}).catch((e)=>{console.log(e)});

module.exports = mongoose; //exporting mongo connection to ensure we make only one connection to DB
