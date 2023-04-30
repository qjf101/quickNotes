import { View, Text, Modal, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons';

function ThemeModal({visible, setThemeModal, theme, setTheme, savePalette}) {
  
  const ListItem = ({ onPress, selected, primary, secondary}) => {
    return (
      <Pressable onPress={onPress} style={[styles.listItem, {borderWidth: selected ? 2 : 0}]}>
        <View style={[{backgroundColor: primary}, styles.primaryColor]}></View>
        <View style={[{backgroundColor: secondary}, styles.secondaryColor]}></View>
      </Pressable>
    )
  };

  const selectThemeOption = (i) => {
    setTheme(i);
    savePalette(palettes[i]);
    setThemeModal(!visible);
  };

  const palettes = [
    {primary: '#ff0000', secondary: '#ffc0cb'},
    {primary: '#ff6f00', secondary: '#fcbb79'},
    {primary: '#ffd500', secondary: '#fce76a'},
    {primary: '#06c906', secondary: '#75f075'},
    {primary: '#0059ff', secondary: '#689bfc'},
    {primary: '#6f00ff', secondary: '#af75fa'},
    {primary: '#bb00ff', secondary: '#e18fff'}
  ];

  return (
    <Modal animationType="fade" visible={visible} transparent={true} statusBarTranslucent>
      <TouchableOpacity onPress={()=>setThemeModal(!visible)} style={styles.overLayContainer} activeOpacity={1}>
        <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <Ionicons name="ios-color-palette-outline" size={30}/>
            <Text style={styles.title}>Theme</Text>
          </View>
          <View style={styles.listContainer}>
          {
            palettes.map((item, i) => {
              return (
                <ListItem key={i} onPress={()=>selectThemeOption(i)} selected={i === theme} primary={item.primary} secondary={item.secondary}/>
              )
            })
          }
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

export default ThemeModal;

const styles = StyleSheet.create({
  overLayContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.60)',
    alignItems: 'center',
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    maxHeight: '60%',
    width: '90%',
    padding: '5%',
    paddingTop: '8%',
    paddingBottom: '15%'
  },
  titleContainer: {
    flexDirection: 'row'
  },
  title: {
    paddingLeft: '4%',
    fontSize: 22
  },
  listContainer: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  listItem: {
    borderRadius: 10,
    marginTop: '6%',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '40%',
    height: '10%',
    overflow: 'hidden'
  },
  listItemText: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  primaryColor: {
    width: '50%'
  },
  secondaryColor: {
    width: '50%'
  }
});
