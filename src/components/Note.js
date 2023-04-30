import { Pressable, Text, StyleSheet, View } from "react-native";
import dayjs from "dayjs";

const Note = ({onPress, noteContent, view, palette}) => {
    const modifiedToday = dayjs(noteContent.modified).format('MMM DD YYYY') == dayjs().format('MMM DD YYYY');
    const modifiedThisYear = dayjs(noteContent.modified).format('YYYY') == dayjs().format('YYYY');
    console.log('>>>>>>>>>' + palette)

    const styles = StyleSheet.create({
        note: {
            borderRadius: 5,
            padding: '6%',
            marginBottom: '2.5%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: palette.secondary
        },
        grid: {
            padding: '3%',
            // height: '20%',
            height: 150,
            width: '49%',
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
            color: palette.primary
        }
    });
    
    return (
        <Pressable onPress={onPress} style={[styles.note, view == 'Grid' ? styles.grid : {}]}>
            <View style={view == 'Grid' ? {} : styles.titleContainer}>
                <Text style={styles.noteText} numberOfLines={view == 'Grid' ? 4 : 1}>{noteContent.title}</Text>
            </View>
            { view == 'Grid' ?
            <></>
            :
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
            }
        </Pressable>
    )
}

export default Note;