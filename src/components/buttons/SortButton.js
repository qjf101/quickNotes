import { Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons';

function SortButton({ onPress, color }) {
  return (
    <Pressable onPress={onPress} >
      <Ionicons name="ios-swap-vertical-outline" size={28} color={color} />
    </Pressable>
  );
}

export default SortButton;