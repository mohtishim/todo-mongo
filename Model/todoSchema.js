import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
  todo: {
    type: String,
    required: true,
    unique: true,
  },
});

export const todoModel = mongoose.model("todo", todoSchema);
