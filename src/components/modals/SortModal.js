import { View, Text, Modal, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

function SortModal({visible, setSortModal, sort, setSort, palette}) {
  const listItems = ['Modified Time', 'Created Time', 'Alphabetically'];

  const ListItem = ({text, onPress, selected}) => {
    return (
      <Pressable onPress={onPress} style={[styles.listItem, {backgroundColor: selected ? palette.secondary : 'white'}]}>
        <Text style={styles.listItemText}>{text}</Text>
        {selected ? <AntDesign name="checkcircleo" size={20} color={palette.primary} /> : <></>}
      </Pressable>
    )
  };
  
  const selectSortOption = (i) => {
    setSort(listItems[i]);
    setSortModal(!visible);
  };

  return (
    <Modal animationType="fade" visible={visible} transparent={true} statusBarTranslucent>
      <TouchableOpacity onPress={()=>setSortModal(!visible)} style={styles.overLayContainer} activeOpacity={1}>
        <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <FontAwesome name={'sort'} size={30} />
            <Text style={styles.title}>Sort</Text>
          </View>
          {
            listItems.map((item, i) => {
              return (
                <ListItem key={i} text={item} onPress={()=>selectSortOption(i)} selected={listItems[i] == sort}/>
              )
            })
          }
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

export default SortModal;

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
    minHeight: '40%',
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
  listItem: {
    borderRadius: 10,
    padding: '7%',
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  listItemText: {
    fontSize: 14,
    fontWeight: 'bold'
  }
});
