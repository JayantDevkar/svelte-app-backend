require("dotenv").config();
const mongoURL = process.env.MONGO_URL;
exports.mongoURL = mongoURL;