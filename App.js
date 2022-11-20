import { StyleSheet, View, StatusBar } from 'react-native';
import Home from './src/screens/Home';

export default function App() {

  return (
    <View style={styles.container}>
      <StatusBar animated={true} barStyle="dark-content" backgroundColor="white" />
      <Home/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  }
});
