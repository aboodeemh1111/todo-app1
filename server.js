// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); // Ensure this line is present
app.use(express.json());

// MongoDB connection
const uri = "your_mongodb_connection_string_here";
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

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
