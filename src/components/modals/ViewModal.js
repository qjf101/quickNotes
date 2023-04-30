import { View, Text, Modal, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

function ViewModal({visible, setViewModal, view, setView, palette}) {
  const listItems = ['List', 'Grid',];
  
  const ListItem = ({text, onPress, selected, icon}) => {
    return (
      <Pressable onPress={onPress} style={[styles.listItem, {backgroundColor: selected ? palette.secondary : 'white'}]}>
        <MaterialCommunityIcons name={icon} size={28} color={palette.primary} />
        <Text style={styles.listItemText}>{text}</Text>
      </Pressable>
    )
  };

  const selectViewOption = (i) => {
    setView(listItems[i]);
    setViewModal(!visible);
  };

  return (
    <Modal animationType="fade" visible={visible} transparent={true} statusBarTranslucent>
      <TouchableOpacity onPress={()=>setViewModal(!visible)} style={styles.overLayContainer} activeOpacity={1}>
        <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <MaterialCommunityIcons name={"view-grid-outline"} size={30} />
            <Text style={styles.title}>View</Text>
          </View>
          <View style={styles.listContainer}>
          {
            listItems.map((item, i) => {
              return (
                <ListItem key={i} text={item} onPress={()=>selectViewOption(i)} selected={listItems[i] == view} icon={i == 0 ? 'view-list' : 'view-grid'}/>
              )
            })
          }
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

export default ViewModal;

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
    minHeight: '35%',
    width: '90%',
    padding: '5%',
    paddingTop: '8%'
  },
  titleContainer: {
    flexDirection: 'row'
  },
  title: {
    paddingLeft: '4%',
    fontSize: 22
  },
  listContainer: {
    flexDirection: 'row'
  },
  listItem: {
    borderRadius: 10,
    padding: '20%',
    marginTop: '5%',
    justifyContent: 'space-between'
  },
  listItemText: {
    fontSize: 14,
    fontWeight: 'bold'
  }
});
