const mongoose = require("./mongo");
const Schema = mongoose.Schema;
const attempt = new Schema({
  userId: {
     type : String, 
     required:true, 
  },
  time:{
    type: Date,
    default: Date.now,
  },
  questions:{
     type : [Schema.Types.ObjectId], 
     ref: 'Question',
     default : []
  },
  feedBack:{
    type : Array,
    default : []
  },
  score:{
      type:Number,
      default:0,
  },
  isSubmitted:{
      type:Boolean,
      default:false
  }
});

const Attempt = mongoose.model("Attempt", attempt, "attempts");

module.exports = Attempt;
