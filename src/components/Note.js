import { Pressable, Text, StyleSheet, View } from "react-native";
import dayjs from "dayjs";

const Note = ({onPress, noteContent, color, accentColor}) => {
    const modifiedToday = dayjs(noteContent.modified).format('MMM DD YYYY') == dayjs().format('MMM DD YYYY');
    const modifiedThisYear = dayjs(noteContent.modified).format('YYYY') == dayjs().format('YYYY');
    return (
        <Pressable onPress={onPress} style={styles.note}>
            <View style={styles.titleContainer}>
                <Text style={styles.noteText} numberOfLines={1}>{noteContent.title}</Text>
            </View>
            <Text style={styles.noteDate}>{
                modifiedToday ?
                // If note was modified today just show time
                dayjs(noteContent.modified).format('h:mm A')
                :
                modifiedThisYear ?
                // If note was modified this year then leave off year
                dayjs(noteContent.modified).format('MMM DD')
                :
                //show year
                dayjs(noteContent.modified).format('MMM DD YYYY')
            }</Text>
        </Pressable>
    )
}

export default Note;

const styles = StyleSheet.create({
    note: {
        borderRadius: 5,
        padding: '6%',
        // height: '20%',
        marginTop: '2.5%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'pink'
    },
    titleContainer: {
        maxWidth: '65%'
    },
    noteText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    noteDate: {
        fontSize: 14,
        color: 'red'
    }
});