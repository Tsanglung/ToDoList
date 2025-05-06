import { View, Text, TouchableOpacity } from "react-native";
import Checkbox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";

export type ToDoType = {
  id: number;
  title: string;
  isDone: boolean;
};

type Props = {
  item: ToDoType;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function ToDoItem({ item, onToggle, onDelete }: Props) {
  const { id, title, isDone } = item;

  return (
    <View className="flex-row flex-1 justify-between items-center bg-white dark:bg-neutral-700 p-4 rounded-lg mb-4">
      <TouchableOpacity
        className="flex-row items-center gap-2"
        onPress={() => onToggle(id)}
      >
        <Checkbox
          value={isDone}
          onValueChange={() => onToggle(id)}
          color={isDone ? "#0a7ea4" : "#9BA1A6"}
        />
        <Text
          numberOfLines={2}
          className={`text-base flex-shrink${
            isDone
              ? "line-through text-gray-500 dark:text-gray-400"
              : "text-[#333333] dark:text-gray-100"
          }`}
        >
          {title}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(id)}>
        <Ionicons name="backspace-outline" size={22} color="#FB7185" />
      </TouchableOpacity>
    </View>
  );
}
