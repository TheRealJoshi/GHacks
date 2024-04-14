import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Text,
  Pressable
} from "react-native";
import {
  widthPercentageToDP as WP,
  heightPercentageToDP as HP,
} from "react-native-responsive-screen";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithCredential, signInWithEmailAndPassword} from "firebase/auth";
import  {app } from './../config'
// import { useAuth } from "./../pages/context"
import {tabcolor, inactiveColor, themecolor} from './../config';
import apiCalendar from 'react-google-calendar-api';


// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';


// GoogleSignin.configure({
// 	webClientId: "896863488448-0a2oojn8nm6fdnfplt4jnknpcjgaqrrq.apps.googleusercontent.com",
// 	androidClientId: "896863488448-hbqdi36sh270dcgj9kcpmog67ekm0h4s.apps.googleusercontent.com",
// 	iosClientId: "896863488448-4cv4i0ivks1sarh7i52tpj8kt8aufd49.apps.googleusercontent.com",
// 	scopes: ['profile', 'email'],
// });
// const { setLoggedInUser } = useAuth();



WebBrowser.maybeCompleteAuthSession();
// web: 896863488448-0a2oojn8nm6fdnfplt4jnknpcjgaqrrq.apps.googleusercontent.com
// ios: 896863488448-4cv4i0ivks1sarh7i52tpj8kt8aufd49.apps.googleusercontent.com
// android: 896863488448-hbqdi36sh270dcgj9kcpmog67ekm0h4s.apps.googleusercontent.com
function LoginScreen({ navigation }) {
  const provider = new GoogleAuthProvider(app);

  // TODO: add google login
  
  // const [accessToken, setAccessToken] = useState("");
  // const [user, setUser] = useState(null);
  // const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
  //   androidClientId: "896863488448-hbqdi36sh270dcgj9kcpmog67ekm0h4s.apps.googleusercontent.com",
  //   iosClientId: "896863488448-4cv4i0ivks1sarh7i52tpj8kt8aufd49.apps.googleusercontent.com",
  //   webClientId: "896863488448-0a2oojn8nm6fdnfplt4jnknpcjgaqrrq.apps.googleusercontent.com",
  // });

  // const handleGoogleLogin = async () => {
	// 	setLoading(true);
	// 	try {
	// 		const response = await GoogleLogin();
	// 		const { idToken, user } = response;

	// 		if (idToken) {
	// 			const resp = await authAPI.validateToken({
	// 				token: idToken,
	// 				email: user.email,
	// 			});
	// 			await handlePostLoginData(resp.data);
	// 		}
	// 	} catch (apiError) {
	// 		setError(
	// 			apiError?.response?.data?.error?.message || 'Something went wrong'
	// 		);
	// 	} finally {
	// 		setLoading(false);
	// 	}
	// };

//   googleLogin = async () => {
//     try {
//       const result = await Expo.Google.logInAsync({
//         androidClientId: "896863488448-hbqdi36sh270dcgj9kcpmog67ekm0h4s.apps.googleusercontent.com",
//         iosClientId: "896863488448-4cv4i0ivks1sarh7i52tpj8kt8aufd49.apps.googleusercontent.com",
//         scopes: ["profile", "email"]

//       })
//       if (result.type === "success") {
//         const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken, result.accessToken);
//            firebase.auth().signInAndRetrieveDataWithCredential(credential).then(function(result){
//              console.log(result);
//            });
//    this.props.navigation.navigate('Where you want to go');
//  } else {
//    console.log("cancelled")
//  }
//     } catch (e) {
//       console.log("error", e)
//     }
// }



  async function fetchUserInfo() {
    // try {
    //   let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
    //     headers: { Authorization:  'Bearer ${accessToken}' }
    //   });
    //   const userInfo = await response.json();
    //   setUser(userInfo);
    // } catch (error) {
    //   console.error(error);
    // }
  }


  // const [, response, promptAsync] = Google.useIdTokenAuthRequest({
  //     androidClientId: "896863488448-hbqdi36sh270dcgj9kcpmog67ekm0h4s.apps.googleusercontent.com",
  //     iosClientId: "896863488448-4cv4i0ivks1sarh7i52tpj8kt8aufd49.apps.googleusercontent.com",
  //     webClientId: "896863488448-0a2oojn8nm6fdnfplt4jnknpcjgaqrrq.apps.googleusercontent.com",
  //     scopes: ['openid', 'email', 'https://www.googleapis.com/auth/calendar'],
  //     responseType: "code",
  //     accessType: "offline",
  //   });
  // useEffect(() => {
  //   console.log("Google login response received:", response);
  //   if(response?.type == "success") {
  //     const { id_token } = response.params;
  //     console.log("success login", id_token);
  //     const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
  //     handleSubmit(credential)
  //   }
  // }, [])
  // const handleSubmit = (credential) => {
  //   console.log("handle submit");
  //   const auth = getAuth();
  //   signInWithPopup(auth, provider)
  //     .then((userCredential) => {
  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credential.accessToken;
  //       // The signed-in user info.
  //       const user = result.user;
  //       // IdP data available using getAdditionalUserInfo(result)
  //       // ...
  //       navigation.navigate('Profile', { userId: user.uid });
  //     }).catch((error) => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // The email of the user's account used.
  //       const email = error.customData.email;
  //       // The AuthCredential type that was used.
  //       const credential = GoogleAuthProvider.credentialFromError(error);
  //       // ...
  //     });
  // };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 


  const handleEmailPasswordLogin = () => {
    console.log("handleEmailPasswordLogin called");
    const auth = getAuth();
  
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {             
        ``
        // apiCalendar.listUpcomingEvents(10);
        // Signed in 
        const user = userCredential.user;
        console.log("User signed in:", user);
        // Navigate to the Profile page or handle the successful login
        // navigation.navigate("Profile");
        // setLoggedInUser(res.user);
      })      
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error signing in:", errorCode, errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.titleContainer}>
        <Text style={styles.text}>Login</Text>
      </View>
      <View style={styles.formContainer}>
        <View>
          <View style={styles.textInput}>
            <TextInput
              placeholder="Email"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="#999"
              keyboardType="email-address"
              textContentType="emailAddress"
              style={styles.textColor}
              onChangeText={setEmail}
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
              onChangeText={setPassword}
            />
          </View>
        </View>
        <TouchableOpacity activeOpacity={1} onPress={handleEmailPasswordLogin}>
          <View style={styles.registerButton}>
            <Text style={styles.registerButtonText}>Login</Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity activeOpacity={1} onPress={() => {handleEmailPasswordLogin}}  style={{top: 10}}>
          <View style={styles.registerButton}>
            <Text style={styles.registerButtonText}>Log In With Google</Text>
            
          </View>
        </TouchableOpacity> */}
         <View style={styles.haveAccountContainer}>
          <Text style={styles.haveAccountText}>Don't have an account?</Text>
          {/* TODO: add navigation register */}
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate("Register")}
          > 
            <Text style={styles.registerText}>Register</Text>
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
    top: 20,
    justifyContent: "center",
  },
  registerButtonText: {
    fontSize: HP(2.2),
    color: "#FFF",
    fontWeight: "bold",
  },
  haveAccountContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    top: HP(6),
  },
  haveAccountText: {
    color: "#000",
    fontSize: HP(1.7),
  },
  registerText: {
    color: `${themecolor}`,
    paddingLeft: WP(1),
    fontSize: HP(1.7),
    fontWeight: "bold", 
  },
});

export default LoginScreen;