import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {
  Entypo,
  MaterialCommunityIcons,
  FontAwesome5,
  Ionicons
} from "@expo/vector-icons";
import Map from './pages/map'
import Home from './pages/home';
import Settings from './pages/settings';
import Registration from './pages/registration';
import Notifications from './pages/notifications';
import Profile from './pages/profile';
import Login from './auth/login';
import Register from './auth/register';
import Splash from './auth/splash';
const HomeNav = createStackNavigator();
const AuthNav = createStackNavigator();
const RegistrationNav = createStackNavigator();
const SettingsNav = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
// import { AuthProvider, useAuth } from "./pages/context";

import {tabcolor, inactiveColor, themecolor} from './config'
import { onAuthStateChanged, getAuth } from 'firebase/auth';

function HomeStack() {
  return (
    <HomeNav.Navigator>
      <HomeNav.Screen name="Home" component={Home} />
      <HomeNav.Screen name="Notifications" component={Notifications} />
      <HomeNav.Screen name="Profile" component={Profile} />
      <HomeNav.Screen name="Settings" component={Settings} />
    </HomeNav.Navigator>
  );
}
function MapStack() {
  return (
    <RegistrationNav.Navigator>
      <RegistrationNav.Screen name="Map" component={Map} />
    </RegistrationNav.Navigator>
  );
}
function ChatStack() {
  return (
    <RegistrationNav.Navigator>
      <RegistrationNav.Screen name="Chat" component={Registration} />
    </RegistrationNav.Navigator>
  );
}
function SettingsStack() {
  return (
    <SettingsNav.Navigator>
      <SettingsNav.Screen name="Settings" component={Settings} />
    </SettingsNav.Navigator>
  );
}
export default function App() {
  // const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(false); // Handle user state changes
  // function onAuthStateChanged(user) {
  //   setUser(user);
  //   if (initializing) setInitializing(false);
  // }
  const auth = getAuth();
  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, async (user) => {
      if (user){
        setUser(user);
      } else {
        console.log("user is signed out")
      }
    });
    return () => subscriber(); // unsubscribe on unmount
  }, [user]);
  // if (initializing) return null;

  var authState = true;
  // var authState =  useAuth();

  return (
    !user ? (
      // User logged in -> tab navigator
      <NavigationContainer>
        <AuthNav.Navigator
        screenOptions={{
          headerShown:false
        }}
        >
          <AuthNav.Screen name="Splash" component={Splash} />
          <AuthNav.Screen name="Login" component={Login} />
          <AuthNav.Screen name="Register" component={Register} />
          <AuthNav.Screen name="Home" component={Home} />
          <AuthNav.Screen name="Profile" component={Profile} />
        </AuthNav.Navigator>
      </NavigationContainer>
    ) : (
      // User logged out -> bottom tab navigator
      <NavigationContainer>
        <Tab.Navigator screenOptions={{
          headerShown:false
        }}
      
      initialRouteName="HomeStack"
        sceneAnimationEnabled="true"
        activeColor={tabcolor}
        inactiveColor={inactiveColor}
        barStyle={{ backgroundColor: `${themecolor}`, bottomPadding: 10 }}
        shifting={true}
      >
          <Tab.Screen name="HomeStack" component={HomeStack} 
          options={{
            tabBarIcon: ({ focused }) => (
              <Entypo
                name="home"
                size={23}
                color={focused ? tabcolor : inactiveColor}
              />
            ),
          }}
          />
          <Tab.Screen name="Map Stack" component={MapStack} 
          options={{
            tabBarIcon: ({ focused }) => (
              <FontAwesome5
                name="map-marked-alt"
                size={23}
                color={focused ? tabcolor : inactiveColor}
              />
            ),
          }}
          />
          <Tab.Screen name="Chat Stack" component={ChatStack} 
          options={{
            tabBarIcon: ({ focused }) => (
              <Entypo
                name="chat"
                size={23}
                color={focused ? tabcolor : inactiveColor}
              />
            ),
          }}
          />
          <Tab.Screen name="Settings Stack" component={SettingsStack} 
            options={{
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  name="settings-sharp"
                  size={23}
                  color={focused ? tabcolor : inactiveColor}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    )
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
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// export default function Login() {
//     return (
//       <View style={styles.container}>
//         <Text>Open up App.js to start working on your app!</Text>
//         <StatusBar style="auto" />
//       </View>
//     );
//   }
  
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#fff',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//   });