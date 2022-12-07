import { useEffect } from "react";
import { View, Text, BackHandler, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import { StorageAccessFramework } from 'expo-file-system';

const Options = ({ setTab, notes }) => {

  useEffect(() => {
    const backAction = () => {
      setTab('blank')
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

    const exportFiles = async () => {
        const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
        if (!permissions.granted) {
            return;
        };

        const createFile = async (title, id, body) => {
            try {
                await StorageAccessFramework.createFileAsync(permissions.directoryUri, `${title}-${id}`, 'text/plain')
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

        notes.forEach((note) => {
            const {title, id, body} = note;
            createFile(title, id, body);
        });
    };

  return (
    <>  
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Options</Text>
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.iconContainer}>
                    <Ionicons name="ios-share-outline" size={32} color="red" onPress={exportFiles}/>
                    <Text style={styles.iconText}>Export</Text>
                </View>
                <View style={styles.iconContainer}>
                    <Ionicons name="ios-color-palette-outline" size={32} color="red"/>
                    <Text style={styles.iconText}>Theme</Text>
                </View>
                <View style={styles.iconContainer}>
                    <Ionicons name="ios-file-tray-full-outline" size={32} color="red"/>
                    <Text style={styles.iconText}>Archive</Text>
                </View>
            </View>
        </View>
    </>
  );
}

export default Options;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        paddingLeft: '6%',
        paddingRight: '6%'
    },
    titleContainer: {
        minHeight: '8%',
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-between',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    title: {
        fontSize: 24,
        color: 'red'
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: '6%',
        justifyContent: 'space-between'
    },
    iconContainer: {
        flexDirection: 'column',
        alignItems: 'center'
    }, 
    iconText: {
        marginTop: 6
    }
});