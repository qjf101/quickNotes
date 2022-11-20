import { Pressable, Text, StyleSheet } from "react-native";

const Note = ({onPress, noteContent, color, accentColor}) => {
    return (
        <Pressable onPress={onPress} style={styles.note}>
            <Text style={styles.noteText}>{noteContent.title}</Text>
            <Text style={styles.noteDate}>{noteContent.modified}</Text>
        </Pressable>
    )
}

export default Note;

const styles = StyleSheet.create({
    note: {
        borderRadius: 5,
        padding: '6%',
        marginTop: '2.5%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'pink'
    },
    noteText: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    noteDate: {
        fontSize: 14,
        color: 'red'
    }
});