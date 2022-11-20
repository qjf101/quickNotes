import { ScrollView, StyleSheet } from "react-native";
import Note from "./Note";

const NotesContainer = ({notes}) => {
    return (
        <ScrollView style={styles.container}>
            { notes ?
                notes.map((note, i) => {
                    return (
                        <Note key={i} noteContent={note}/>
                    )
                })
                :
                <></>
            }
        </ScrollView>
    )
}

export default NotesContainer;

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      height: '100%',
      paddingLeft: '2%',
      paddingRight: '2%',
      paddingTop: '1%'
    }
});