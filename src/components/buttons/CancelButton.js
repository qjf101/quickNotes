import { Pressable, Text, StyleSheet } from "react-native";

function CancelButton({ onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.text}>Cancel</Text>
    </Pressable>
  );
}

export default CancelButton;

const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#d4d5d7',
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center',
        marginRight: '2%'
    },
    text: {
        fontSize: 18
    }
});