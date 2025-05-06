import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  searchText: string;
  onChangeText: (text: string) => void;
};

export default function SearchBar({ searchText, onChangeText }: Props) {
  return (
    <View className="flex-row items-center bg-white dark:bg-neutral-700 px-4 py-1 rounded-2xl mb-2 shadow-sm">
      <Ionicons
        name="search-outline"
        size={20}
        color={searchText ? "#888" : "#E0E0E0"}
      />

      <TextInput
        placeholder="搜尋待辦事項..."
        placeholderTextColor="#A0A0A0"
        className="ml-2 flex-1 text-base text-gray-800 dark:text-gray-100"
        value={searchText}
        onChangeText={onChangeText}
      />

      {searchText.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText("")}>
          <Ionicons name="close-outline" size={20} color="#B0B0B0" />
        </TouchableOpacity>
      )}
    </View>
  );
}
