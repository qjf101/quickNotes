import { View, Text, TextInput, StyleSheet, Keyboard } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import dayjs from "dayjs";

function EditNote({selectedNote, setSelectedNote, create, update, deleteNote}) {
  const {id} = selectedNote;
  const [title, setTitle] = useState(selectedNote.title);
  const [body, setBody] = useState(selectedNote.body);
  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    Keyboard.dismiss()
    setEditing(false)

    let date = dayjs().format();

    if (selectedNote.id) {
      update(title, body, date, id)
    } else {
      create(title, body, date)
    }
  }

  const handleDelete = () => {
    deleteNote(id)
    setSelectedNote(null)
  }

  return (
    <View style={styles.container}>
    <View style={styles.nav}>
      { editing ?
      <Ionicons name="ios-checkmark-sharp" size={26} color="red" onPress={()=>handleSave()}/>
      :
      <Ionicons name="ios-arrow-back-sharp" size={26} color="red" onPress={()=>setSelectedNote(null)}/>
      }
      <View style={styles.buttonContainer}>
        <Ionicons name="ios-share-outline" size={26} color="red" />
        {/* <Ionicons name="ios-ellipsis-horizontal-sharp" size={24} color="red" /> */}
        <Ionicons name="ios-trash-outline" size={26} color="red" onPress={()=>handleDelete()}/>
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
