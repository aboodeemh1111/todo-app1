// components/TodoItem.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const TodoItem = ({ item, deleteTodo }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.text}</Text>
      <TouchableOpacity onPress={() => deleteTodo(item.key)}>
        <Text style={styles.deleteText}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 16,
    marginTop: 16,
    borderColor: "#bbb",
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemText: {
    marginLeft: 10,
  },
  deleteText: {
    color: "red",
  },
});

export default TodoItem;
