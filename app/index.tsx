import { KeyboardAvoidingView, Platform, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ToDoType } from "@/components/ToDoItem";
import SearchBar from "@/components/SearchBar";
import FilterBar from "@/components/FilterBar";
import TodoInputBar from "@/components/ToDoInputBar";
import TodoList from "@/components/ToDoList";

export default function Index() {
  const [todos, setTodos] = useState<ToDoType[]>([]);
  const [todoText, setTodoText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "done" | "pending">("all");

  const originalTodosRef = useRef<ToDoType[]>([]);

  useEffect(() => {
    const load = async () => {
      const stored = await AsyncStorage.getItem("my-todo");
      //AsyncStorage.clear();
      if (stored) {
        const parsed = JSON.parse(stored);
        setTodos(parsed);
        originalTodosRef.current = parsed;
      }
    };
    load();
  }, []);

  const saveTodos = async (newTodos: ToDoType[]) => {
    await AsyncStorage.setItem("my-todo", JSON.stringify(newTodos));
  };

  const updateTodos = async (updated: ToDoType[]) => {
    setTodos(updated);
    originalTodosRef.current = updated;
    await saveTodos(updated);
  };

  const addTodo = async () => {
    const trimmed = todoText.trim();
    if (!trimmed) return;

    const newTodo: ToDoType = {
      id: Date.now(),
      title: trimmed,
      isDone: false,
    };

    await updateTodos([...todos, newTodo]);
    setTodoText("");
  };

  const deleteTodo = (id: number) => {
    Alert.alert(
      "確認刪除",
      "您確定要刪除這個待辦項目嗎？",
      [
        {
          text: "取消",
          style: "cancel",
        },
        {
          text: "刪除",
          style: "destructive",
          onPress: async () => {
            // 用戶選擇刪除後直接更新待辦項目列表
            const newTodos = todos.filter((t) => t.id !== id);
            setTodos(newTodos);
            originalTodosRef.current = newTodos;
            await saveTodos(newTodos);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleDone = async (id: number) => {
    await updateTodos(
      todos.map((t) => (t.id === id ? { ...t, isDone: !t.isDone } : t))
    );
  };

  const filterAndSearchTodos = (
    query: string,
    filter: "all" | "done" | "pending"
  ) => {
    let filtered = originalTodosRef.current;

    if (filter === "done") filtered = filtered.filter((t) => t.isDone);
    else if (filter === "pending") filtered = filtered.filter((t) => !t.isDone);

    if (query.trim()) {
      filtered = filtered.filter((t) =>
        t.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    setTodos(filtered);
  };

  const onSearch = (query: string) => {
    setSearchQuery(query);
    filterAndSearchTodos(query, filter);
  };

  const onFilterChange = (f: "all" | "done" | "pending") => {
    setFilter(f);
    filterAndSearchTodos(searchQuery, f);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100 dark:bg-neutral-900 px-5">
      <View className="p-2">
        <SearchBar searchText={searchQuery} onChangeText={onSearch} />
        <FilterBar filter={filter} onFilterChange={onFilterChange} />
      </View>

      <TodoList todos={todos} onToggle={handleDone} onDelete={deleteTodo} />

      <KeyboardAvoidingView
        className="absolute bottom-5 left-5 right-5"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={20}
      >
        <TodoInputBar
          todoText={todoText}
          onChangeText={setTodoText}
          onAdd={addTodo}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
