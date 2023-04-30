import { useEffect, useState } from "react";
import { View, Text, BackHandler, StyleSheet, Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import { StorageAccessFramework } from 'expo-file-system';
import ThemeModal from "../components/modals/ThemeModal";

const Options = ({ setTab, notes, theme, setTheme, palette, savePalette }) => {
  const [themeModal, setThemeModal] = useState(false);

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
                <Text style={[styles.title, {color: palette.primary}]}>Options</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Pressable style={styles.iconContainer} onPress={exportFiles} hitSlop={20}>
                    <Ionicons name="ios-share-outline" size={32} color={palette.primary}/>
                    <Text style={styles.iconText}>Export</Text>
                </Pressable>
                <Pressable style={styles.iconContainer} onPress={() => setThemeModal(!themeModal)} hitSlop={20}>
                    <Ionicons name="ios-color-palette-outline" size={32} color={palette.primary}/>
                    <Text style={styles.iconText}>Theme</Text>
                </Pressable>
                <Pressable style={styles.iconContainer}>
                    <Ionicons name="ios-file-tray-full-outline" size={32} color={palette.primary}/>
                    <Text style={styles.iconText}>Archive</Text>
                </Pressable>
            </View>
        </View>
        <ThemeModal visible={themeModal} setThemeModal={setThemeModal} theme={theme} setTheme={setTheme} savePalette={savePalette}/>
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
        fontSize: 24
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