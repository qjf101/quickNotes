import { ScrollView, StyleSheet, View } from "react-native";
import Note from "./Note";

const NotesContainer = ({notes, view}) => {
    return (
        <View style={{height: '85%', backgroundColor: 'teal'}}>
            <ScrollView style={styles.container} 
            contentContainerStyle={styles.content}
            >
                <View style={view == 'Grid' ? styles.innerContainer : {}}>
                { notes ?
                    notes.map((note, i) => {
                        return (
                            <Note key={i} noteContent={note} view={view}/>
                        )
                    })
                    :
                    <></>
                }
                </View>
            </ScrollView>
        </View>
    )
}

export default NotesContainer;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      paddingLeft: '2%',
      paddingRight: '2%',
      paddingTop: '1%',
    },
    content: {
        minHeight: '100%',
    },
    innerContainer: {
    //   flex: 1,
    //   height: '100%',
      flexDirection: 'row', 
      flexWrap: 'wrap', 
      justifyContent: 'space-between'
    }
});