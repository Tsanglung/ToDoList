import { TouchableOpacity, Text, View } from "react-native";

interface FilterBarProps {
  filter: "all" | "done" | "pending";
  onFilterChange: (filter: "all" | "done" | "pending") => void;
}

const FilterBar = ({ filter, onFilterChange }: FilterBarProps) => {
  const getButtonStyle = (buttonFilter: "all" | "done" | "pending") => {
    return `flex-1 px-4 py-2 ${
      filter === buttonFilter
        ? "border-b border-blue-400 dark:border-blue-300"
        : ""
    }`;
  };

  const getTextStyle = (buttonFilter: "all" | "done" | "pending") => {
    return `text-center ${
      filter === buttonFilter
        ? "font-bold text-blue-400 dark:text-blue-300"
        : "text-gray-500 dark:text-gray-400"
    }`;
  };

  return (
    <View className="flex-row justify-center mb-4 gap-4">
      <TouchableOpacity
        onPress={() => onFilterChange("all")}
        className={getButtonStyle("all")}
      >
        <Text className={getTextStyle("all")}>全部</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onFilterChange("done")}
        className={getButtonStyle("done")}
      >
        <Text className={getTextStyle("done")}>完成</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onFilterChange("pending")}
        className={getButtonStyle("pending")}
      >
        <Text className={getTextStyle("pending")}>待辦</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FilterBar;
