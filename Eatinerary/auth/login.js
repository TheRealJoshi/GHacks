import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function Login({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Login Page</Text>
      <Text onPress={() => navigation.navigate("Register")}>Need to register?</Text>
      {/* <Text onPress={() => navigation.navigate("Register")}>Need to register?</Text> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});