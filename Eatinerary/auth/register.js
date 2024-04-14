import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Text,
} from "react-native";
import {
  widthPercentageToDP as WP,
  heightPercentageToDP as HP,
} from "react-native-responsive-screen";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import {tabcolor, inactiveColor, themecolor} from './../config'

function RegisterScreen({ navigation }) {
  // TODO: add google login
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [fullName, setFullName] = useState();
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleSubmit = () => {
    if (!email || !password || !fullName) {
      setMessage("Please fill in all fields");
      setMessageType('error');
      return; // Stop the function if fields are empty
    }
  
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        // User was created successfully, now update the profile.
        userCredentials.user.updateProfile({
          displayName: fullName,
        }).then(() => {
          setMessage("Registration complete");
          setMessageType('success');
          // Optionally navigate to another screen here
          // navigation.navigate("Profile", { userId: userCredentials.user.uid });
        });
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.message);
        setMessageType('error');
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.titleContainer}>
        <Text style={styles.text}>Register</Text>
      </View>
      <View style={styles.formContainer}>
        <View>
          <View style={styles.textInput}>
            <TextInput
              placeholder="Full Name"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="#999"
              style={styles.textColor}
              onChangeText={(text) => setFullName(text)}
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              placeholder="Email"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="#999"
              keyboardType="email-address"
              textContentType="emailAddress"
              style={styles.textColor}
              onChangeText={(email) => setEmail(email)}
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              placeholder="Password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              style={styles.textColor}
              placeholderTextColor="#999"
              textContentType="password"
              onChangeText={(password) => setPassword(password)}
            />
          </View>
        </View>
        <TouchableOpacity activeOpacity={1} onPress={handleSubmit}>
          <View style={styles.registerButton}>
            <Text style={styles.registerButtonText}>Register</Text>
          </View>
        </TouchableOpacity>
        {/* Message display */}
        <Text style={[styles.message, messageType === 'error' ? styles.errorMessage : styles.successMessage]}>
          {message}
        </Text>
        <View style={styles.haveAccountContainer}>
          <Text style={styles.haveAccountText}>Have an account?</Text>
          <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  titleContainer: {
    bottom: HP(6),
  },
  text: {
    textAlign: "center",
    fontSize: HP(6.5),
    fontWeight: "bold",
    color: "#000",
  },
  formContainer: {
    paddingHorizontal: WP(8),
  },
  textInput: {
    paddingLeft: WP(4),
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#fff",
    width: WP(85),
    height: HP(7),
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#aeaeae",
    marginTop: HP(1),
  },
  textColor: {
    color: "#5A5A5A",
    width: WP(80),
    height: HP(5),
  },
  registerButton: {
    borderRadius: 12,
    backgroundColor: `${themecolor}`,
    height: HP(7),
    shadowOffset: { width: WP(0), height: HP(0.24) },
    shadowColor: "black",
    shadowOpacity: 0.25,
    alignItems: "center",
    top: HP(4),
    justifyContent: "center",
  },
  registerButtonText: {
    fontSize: HP(2.2),
    color: "#fff",
    fontWeight: "bold",
  },
  haveAccountContainer: {
    flexDirection: "row",
    justifyContent: "center",
    top: HP(6),
    alignItems: "center",
  },
  haveAccountText: {
    color: "#000",
    fontSize: HP(1.7),
  },
  loginText: {
    color: `${themecolor}`,
    paddingLeft: WP(1),
    fontSize: HP(1.7),
    fontWeight: "bold",
  },
  message: {
    textAlign: 'center',
    fontSize: HP(2),
    marginTop: HP(2),
  },
  successMessage: {
    color: 'green',
  },
  errorMessage: {
    color: 'red',
  },
});

export default RegisterScreen;