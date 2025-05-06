import { FlatList } from "react-native";
import ToDoItem, { ToDoType } from "./ToDoItem";

type Props = {
  todos: ToDoType[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function TodoList({ todos, onToggle, onDelete }: Props) {
  return (
    <FlatList
      className="px-2"
      data={[...todos].reverse()}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ToDoItem item={item} onToggle={onToggle} onDelete={onDelete} />
      )}
      contentContainerStyle={{ paddingBottom: 120 }}
      keyboardShouldPersistTaps="handled"
    />
  );
}
