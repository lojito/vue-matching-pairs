import mongoose from "mongoose";
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  categoryId: Number,
  clicks: Number,
  fails: Number,
  folder: String,
  time: String,
  squares: { type: [Number], required: true },
  age: Number,
});

export default mongoose.model("Game", gameSchema);
