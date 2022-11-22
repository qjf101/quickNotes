import { View, StyleSheet, TextInput } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const SearchBar = ({setTab, searchTerm, setSearchTerm}) => {
  return (
    <View style={styles.container}>
        <Ionicons name="ios-arrow-back-sharp" size={26} color="black" onPress={()=>setTab('blank')}/>
        <TextInput
        style={styles.input}
        onChangeText={setSearchTerm}
        placeholder={'search'}
        autoFocus
        value={searchTerm}
        />
    </View>
  );
}

export default SearchBar;

const styles = StyleSheet.create({
    container: {
      minHeight: '8%',
      backgroundColor: 'white',
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'space-between',
      paddingLeft: '4%',
      paddingRight: '4%'
    },
    input: {
        height: '70%',
        width: '88%',
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#ededee',
        textAlignVertical: 'center'
    }
});