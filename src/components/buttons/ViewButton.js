import { Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons';

function ViewButton({ onPress, color }) {
  return (
    <Pressable onPress={onPress}>
      <Ionicons name="ios-grid-outline" size={28} color={color} />
    </Pressable>
  );
}

export default ViewButton;