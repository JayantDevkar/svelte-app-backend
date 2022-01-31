const mongoose = require("./mongo");
const Schema = mongoose.Schema;
const question = new Schema({
  ask: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    default: [],
  },
  answers:{
    type: Array,
    default: [],
  },
  level:{
    type: Number,
    default: 1,
  },
  poll:{
    type: Schema.Types.Mixed,
    default: {},
  }
});

const Question = mongoose.model("Question", question, "questions");

module.exports = Question;
