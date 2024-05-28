const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { VercelRequest, VercelResponse } = require("@vercel/node");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Todo schema and model
const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
});

const Todo = mongoose.model("Todo", todoSchema);

// Routes
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/todos", async (req, res) => {
  const newTodo = new Todo({
    text: req.body.text,
  });
  const savedTodo = await newTodo.save();
  res.json(savedTodo);
});

app.delete("/todos/:id", async (req, res) => {
  const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
  res.json(deletedTodo);
});

module.exports = (req, res) => {
  app(req, res);
};