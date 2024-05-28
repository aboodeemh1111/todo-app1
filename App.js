import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import axios from "axios";
import TodoItem from "./components/TodoItem";
import Header from "./components/Header";
import AddTodo from "./components/AddTodo";

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/todos");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const submitHandler = async (text) => {
    if (text.length > 3) {
      try {
        const response = await axios.post("http://localhost:5000/todos", {
          text,
        });
        setTodos((prevTodos) => [response.data, ...prevTodos]);
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    } else {
      Alert.alert("OOPS", "Todos must be over 3 chars long", [
        { text: "Understood", onPress: () => console.log("alert closed") },
      ]);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        console.log("dismissed keyboard");
      }}
    >
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <AddTodo submitHandler={submitHandler} />
          <View style={styles.list}>
            <FlatList
              data={todos}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <TodoItem item={item} deleteTodo={deleteTodo} />
              )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 40,
  },
  list: {
    marginTop: 20,
  },
});
