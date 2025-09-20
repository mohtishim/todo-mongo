import express from "express";
import { todoModel } from "./Model/todoSchema.js";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const PORT = 4000;
app.use(express.json());
app.use(cors());

const MONGODB_URI = `mongodb+srv://admin:admin@cluster0.daxgm2j.mongodb.net/todolist`;

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// ✅ Get all todos
app.get("/todos", async (req, res) => {
  try {
    const getData = await todoModel.find();
    res.status(200).json(getData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Create a new todo
app.post("/todos", async (req, res) => {
  try {
    const { todo } = req.body;
    if (!todo) {
      return res.status(400).json({ message: "Please Enter Todo" });
    }

    const saveTodo = await todoModel.create({ todo });
    res.status(201).json(saveTodo); // return the saved todo directly
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Update a todo (PUT)
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { todo } = req.body;

    if (!todo) {
      return res.status(400).json({ message: "Todo text required" });
    }

    const updatedTodo = await todoModel.findByIdAndUpdate(
      id,
      { todo },
      { new: true } // return updated document
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Delete a todo (DELETE)
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTodo = await todoModel.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted", deletedTodo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
