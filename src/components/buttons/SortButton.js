import { Pressable } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

function SortButton({ onPress, name }) {
  return (
    <Pressable onPress={onPress}>
      <FontAwesome name={name} size={30} />
    </Pressable>
  );
}

export default SortButton;