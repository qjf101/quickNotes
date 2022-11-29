import { ScrollView, StyleSheet, View, Text } from "react-native";
import Note from "./Note";

const NotesContainer = ({notes, view, noResults, setSelectedNote}) => {
    return (
        <View style={{height: '85%'}}>
            { noResults ?
            <View style={styles.noResults}>
                <Text style={styles.noResultsText}>No results found</Text>
            </View>
            :
            <ScrollView style={styles.container} 
            contentContainerStyle={styles.content}
            >   
                <View style={view == 'Grid' ? styles.innerContainer : {}}>
                { notes ?
                    notes.map((note, i) => {
                        return (
                            <Note key={i} noteContent={note} view={view} onPress={()=>setSelectedNote(note)}/>
                        )
                    })
                    :
                    <></>
                }
                </View>
            </ScrollView>
            }
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
    },
    noResults: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    noResultsText: {
        fontSize: 22
    }
});