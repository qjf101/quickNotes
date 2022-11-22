import { View } from "react-native";
import { Ionicons } from '@expo/vector-icons';

function SortIcon({color}) {
  return (
    <View style={{maxHeight: 30, marginTop: -5}}>
      <Ionicons name="ios-play-outline" size={22} color={color} style={{transform: [{ rotate: '270deg' }], margin: -4}}/>
      <Ionicons name="ios-play-outline" size={22} color={color} style={{transform: [{ rotate: '90deg' }]}}/>
    </View>
  );
}

export default SortIcon;