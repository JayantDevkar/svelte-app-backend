const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });
const mnguri = require("../mongoURL");
// mongoose.set("useFindAndModify", false);

mongoose.connect(mnguri.mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{console.log("DB CONNECTED ")}).catch((e)=>{console.log(e)});
// mongoose.set("useNewUrlParser", true);
// mongoose.set("useFindAndModify", false);
// mongoose.set("useCreateIndex", true);
module.exports = mongoose;
