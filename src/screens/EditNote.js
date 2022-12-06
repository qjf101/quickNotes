import { View, Text, TextInput, StyleSheet, Keyboard, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import dayjs from "dayjs";
import DeleteNoteModal from "../components/modals/DeleteNoteModal";
import * as FileSystem from 'expo-file-system';
import { StorageAccessFramework } from 'expo-file-system';

function EditNote({selectedNote, setSelectedNote, create, update, deleteNote}) {
  const {id} = selectedNote;
  const [title, setTitle] = useState(selectedNote.title);
  const [body, setBody] = useState(selectedNote.body);
  const [editing, setEditing] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleSave = () => {
    Keyboard.dismiss()
    setEditing(false)

    let date = dayjs().format();

    if (selectedNote.id) {
      update(title, body, date, id)
    } else {
      create(title, body, date)
    }
  };

  const exportFile = async () => {
    if (!title) return Alert.alert(
      "Title is blank",
      "Add a title to save this note",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
    const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (!permissions.granted) {
        return;
    }

    try {
        await StorageAccessFramework.createFileAsync(permissions.directoryUri, title, 'text/plain')
            .then(async(uri) => {
                await FileSystem.writeAsStringAsync(uri, `${title} \n\n${body}`, { encoding: FileSystem.EncodingType.UTF8 });
            })
            .catch((e) => {
                console.log(e);
            });
    } catch (e) {
        throw new Error(e);
    }
  };

  const handleDelete = () => {
    deleteNote(id)
    setSelectedNote(null)
  };

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        { editing ?
        <Ionicons name="ios-checkmark-sharp" size={26} color="red" onPress={()=>handleSave()}/>
        :
        <Ionicons name="ios-arrow-back-sharp" size={26} color="red" onPress={()=>setSelectedNote(null)}/>
        }
        <View style={styles.buttonContainer}>
          <Ionicons name="ios-share-outline" size={26} color="red" onPress={exportFile}/>
          {/* <Ionicons name="ios-ellipsis-horizontal-sharp" size={24} color="red" /> */}
          <Ionicons name="ios-trash-outline" size={26} color="red" onPress={()=>setDeleteModal(!deleteModal)}/>
        </View>
      </View>
      <Text style={styles.date}>
        {dayjs(selectedNote.modified).format('MMMM DD, YYYY')}
      </Text>
      <TextInput
          style={styles.title}
          onChangeText={setTitle}
          placeholder={'Title'}
          onFocus={()=>setEditing(true) }
          multiline={true}
          blurOnSubmit={false}
          spellCheck={editing ? true : false}
          value={title}
      />
      <TextInput
          style={styles.body}
          onChangeText={setBody}
          placeholder={'Note text'}
          onFocus={()=>setEditing(true) }
          multiline={true}
          blurOnSubmit={false}
          spellCheck={editing ? true : false}
          value={body}
      />
      <DeleteNoteModal visible={deleteModal} setDeleteModal={setDeleteModal} handleDelete={handleDelete}/>
    </View>
  );
}

export default EditNote;

const styles = StyleSheet.create({
  container: {
    paddingLeft: '4%',
    paddingRight: '4%'
  },
  date: {
    color: 'grey'
  },  
  title: {
    marginTop: '4%',
    fontWeight: 'bold',
    fontSize: 24
  },
  body: {
    marginTop: '5%',
    fontSize: 16
  },
  nav: {
    minHeight: '8%',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginBottom: '3%'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '20%'
  }
});
