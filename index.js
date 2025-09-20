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
  .then((res) => console.log("MongDB connected"))
  .catch((err) => console.log(err));

app.get('/todos', async (req, res)=>{
  try {
    const getData = await todoModel.find()
    res.status(200).json(getData)
  } catch (error) {
    console.log(error)
  }
})

app.post("/todos", async (req, res) => {
  try {
    const { todo } = req.body;
    console.log(todo);
    if (!todo) {
      res.status(400).json({
        message: "Please Enter Todo",
      });
    }

    const todoObj = {
      todo,
    };

    const saveTodo = await todoModel.create(todoObj);

    res.status(200).json({
      message: "todo added",
      saveTodo,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log("server is running");
});
