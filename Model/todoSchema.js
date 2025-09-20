import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
  todo: {
    type: String,
    require: true,
    unique: true,
  },
});

export const todoModel = mongoose.model("todo", todoSchema);
