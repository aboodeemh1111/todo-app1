import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Switch,
  Text,
} from "react-native";
import axios from "axios";
import TodoItem from "./components/TodoItem";
import Header from "./components/Header";
import AddTodo from "./components/AddTodo";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        "https://mobile-apps-gd4h8503k-abdullahs-projects-d8a073e4.vercel.app/api/todos"
      );
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error.message);
      console.error("Error details:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(
        `https://mobile-apps-gd4h8503k-abdullahs-projects-d8a073e4.vercel.app/api/todos/${id}`
      );
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const submitHandler = async (text) => {
    if (text.length > 3) {
      try {
        const response = await axios.post(
          "https://mobile-apps-gd4h8503k-abdullahs-projects-d8a073e4.vercel.app/api/todos",
          { text }
        );
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

  const toggleSwitch = () => {
    setIsDarkMode((previousState) => !previousState);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        console.log("dismissed keyboard");
      }}
    >
      <View style={isDarkMode ? styles.containerDark : styles.container}>
        <Header />
        <View style={styles.themeSwitch}>
          <Text style={isDarkMode ? styles.darkText : styles.lightText}>
            Dark Mode
          </Text>
          <Switch onValueChange={toggleSwitch} value={isDarkMode} />
        </View>
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
  containerDark: {
    flex: 1,
    backgroundColor: "#333",
  },
  themeSwitch: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  content: {
    padding: 40,
  },
  list: {
    marginTop: 20,
  },
  darkText: {
    color: "#fff",
  },
  lightText: {
    color: "#000",
  },
});
