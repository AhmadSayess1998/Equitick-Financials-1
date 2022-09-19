const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    deal: {
      type: Number,
      required: true,
    },
    login: {
      type: Number,
      required: true,
    },
    entry: {
      type: Number,
      required: true,
    },
    action: {
      type: Number,
      required: true,
    },
    time: {
      type: Date,
      default: Date.now,
      required: true,
    },
    symbol: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    profit: {
      type: Number,
      required: true,
    },
    volume: {
      type: Number,
      required: true,
    },
  }
  //   { timestamps: true }
);

const post = mongoose.model("post", postSchema);
module.exports = post;
