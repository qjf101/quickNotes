import { Pressable } from "react-native";
import SortIcon from "../icons/SortIcon";

function SortButton({ onPress, color }) {
  return (
    <Pressable onPress={onPress} >
      <SortIcon color={color}/>
    </Pressable>
  );
}

export default SortButton;