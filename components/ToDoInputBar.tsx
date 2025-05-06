import { Ionicons } from "@expo/vector-icons";
import { Keyboard, TextInput, TouchableOpacity, View } from "react-native";

type Props = {
  todoText: string;
  onChangeText: (text: string) => void;
  onAdd: () => void;
};

export default function TodoInputBar({ todoText, onChangeText, onAdd }: Props) {
  return (
    <View className="flex-row items-center bg-white dark:bg-neutral-700 rounded-2xl px-4 py-2 shadow-md">
      <TextInput
        placeholder="輸入待辦事項..."
        placeholderTextColor="#9ca3af"
        value={todoText}
        onChangeText={onChangeText}
        className="flex-1 text-base text-gray-800 dark:text-gray-100"
        cursorColor="#4630EB"
        onSubmitEditing={() => {
          onAdd();
          Keyboard.dismiss();
        }}
      />
      <TouchableOpacity
        onPress={onAdd}
        className="ml-3 bg-blue-400 dark:bg-yellow-400 p-2 rounded-xl"
      >
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
