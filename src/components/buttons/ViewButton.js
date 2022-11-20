import { Pressable } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

function ViewButton({ onPress, name }) {
  return (
    <Pressable onPress={onPress}>
      <MaterialCommunityIcons name={name} size={30} />
    </Pressable>
  );
}

export default ViewButton;