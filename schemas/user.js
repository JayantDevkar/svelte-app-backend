const mongoose = require("./mongo");
const Schema = mongoose.Schema;
const user = new Schema({
  name: {
    type: String,
    required: true,
  },
  attempt: {
     type : [Schema.Types.ObjectId], 
     ref: 'Attempt', 
     default : [], 
  },
  uuid:{
      type:String,
      required:true,
  }
});

const User = mongoose.model("User", user, "users");

module.exports = User;
