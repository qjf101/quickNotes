import { View, Text, Modal, StyleSheet, TouchableOpacity, Button } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import DeleteButton from "../buttons/DeleteButton";
import CancelButton from "../buttons/CancelButton";

function DeleteModal({visible, setDeleteModal, handleDelete}) {

  return (
    <Modal animationType="fade" visible={visible} transparent={true} statusBarTranslucent>
      <TouchableOpacity onPress={()=>setDeleteModal(!visible)} style={styles.overLayContainer} activeOpacity={1}>
        <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
            <Ionicons name="ios-trash-outline" size={46} color="red"/>
            <Text style={styles.title}>Delete Note</Text>
            <Text style={styles.body}>Are you sure you want to permanently delete this note?</Text>
            <View style={styles.buttonContainer}>
              <CancelButton onPress={()=>setDeleteModal(!visible)}/>
              <DeleteButton onPress={()=>handleDelete()}/>
            </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

export default DeleteModal;

const styles = StyleSheet.create({
  overLayContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.60)',
    alignItems: 'center',
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 20,
    minHeight: '35%',
    width: '90%',
    padding: '5%',
    paddingTop: '8%'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24
  },
  body: {
    marginTop: '4%',
    color: 'grey',
    fontWeight: 'bold',
    fontSize: 20
  },
  buttonContainer: {
    marginTop: '6%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
