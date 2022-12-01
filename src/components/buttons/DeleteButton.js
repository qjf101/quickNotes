import { Pressable, Text, StyleSheet } from "react-native";

function DeleteButton({ onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.text}>Delete</Text>
    </Pressable>
  );
}

export default DeleteButton;

const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        backgroundColor: 'red',
        padding: 10,
        alignItems: 'center',
        marginLeft: '2%'
    },
    text: {
        color: 'white',
        fontSize: 18
    }
});