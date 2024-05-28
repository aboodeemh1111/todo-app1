const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { VercelRequest, VercelResponse } = require("@vercel/node");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
});

const Todo = mongoose.model("Todo", todoSchema);

app.get("/api/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/api/todos", async (req, res) => {
  const newTodo = new Todo({
    text: req.body.text,
  });
  try {
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete("/api/todos/:id", async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    res.json(deletedTodo);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = (req, res) => {
  app(req, res);
};
