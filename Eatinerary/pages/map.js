import React, { useState, useEffect } from 'react';
import { Platform, TextInput, Modal, View, Button, StyleSheet, Text, Alert, StatusBar} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Device from 'expo-device';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import {Marker} from 'react-native-maps';
import {totalUserData} from './settings'
import {tabcolor} from './../config'
import {
    AntDesign
  } from "@expo/vector-icons";
// import {IconButtons, Colors} from 'react-native-paper'

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [data, setData] = useState(null);

  async function runAll(data) {
    // For text-and-image input (multimodal), use the gemini-pro-vision model
        try {
            //  = process.env.API_SECRET
            const genAI = new GoogleGenerativeAI("AIzaSyCjA4ITQDgUA7yfEPbo8SKOJxbObFmcDGg");
            // const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
            // const options = {
            //   RequestOptions: {
            //     version: "v1beta"
            //   }
            // }
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest"}, { apiVersion: "v1beta" });
            // const model = genAI.getGenerativeModel({ model: "gemini-pro"});

            const chat = model.startChat({
                history: historySoFar,
                messages,
                generationConfig: {
                  maxOutputTokens: 1000,
                },
              });
            
            // const msg = "Who am I?";
            console.log(data);
            // Please reference the json string I provided to you before. That is all real-time current updated information about dining halls on umich campus. Now please answer the following prompt:
            
            const msg =  ". Please list everything out and do not hallucinate from any information other than what I have provided. Be concise and do not add any extra information." + "List it very SIMPLY and only name a dish or a few dishes matching the criterion. Also, consider my goals as: a vegetarian, 50g protein, 50g carbs. Now this is my request: " + data ;
            const result = await chat.sendMessage(msg);
              const response = await result.response;
              const text = response.text();
              console.log(text);
              setCounter(counter + 1);
              console.log("responses length is " + messages.length);
              const struct = [{
                _id: Math.random().toString(36).substring(7),
                text: text,
                createdAt: new Date(),
                user: {
                  _id: 2,
                  name: 'React Native',
                  avatar: 'https://placeimg.com/140/140/any',
                },
              },]
              
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && !Device.isDevice) {
        setErrorMsg(
          'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
if (errorMsg) {
    text = errorMsg;
} else if (location) {
    text = JSON.stringify(location);
}

const coords = [
    {latitude: 37.3317876, longitude: -122.0054812},
    {latitude: 37.771707, longitude: -122.4053769},
    {latitude: 37.7896386, longitude: -122.421646},
    {latitude: 37.773972, longitude: -122.431297},
];

// const GOOGLE_MAPS_APIKEY = 'AIzaSyCUFZ6i7YdM3X2HEUcnFK_CNq_VfKsr4eI'
const GOOGLE_MAPS_APIKEY = 'AIzaSyCgc2U0uaEHn70aTUGbnL0KnOgsSG7wst8';

  return (
    <View style={styles.container}>
    { 
      location ? 
      <MapView 
      style={{flex:1}} 
      initialRegion={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421, 
      }}
    //   provider={PROVIDER_GOOGLE}
    >
        <Marker
        coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        }}
        title="You are here."
        description="Your Current Location."
        // image={require('../assets/current.png')}
        />
        <Marker
        coordinate={{
            latitude: 42.285060,
            longitude: -83.730470,
        }}
        title="CCCB"
        description="GHacks Hackathon"
        // image={require('../assets/current.png')}
        />
        <Marker
        coordinate={{
            latitude: 42.336320,
            longitude: -83.732670,
        }}
        title="Weiser Hall"
        description="Math Class"
        // image={require('../assets/current.png')}
        />
        <Marker
        coordinate={{
            latitude: 42.275000,
            longitude: -83.733120,
        }}
        title="Starbucks (South U)"
        description="Coffee Chat"
        // image={require('../assets/current.png')}
        />
        <Marker
        coordinate={{
            latitude: 42.281420,
            longitude: -83.748480,
        }}
        title="GGBL Building"
        description="EECS445 Discussion"
        // image={require('../assets/current.png')}
        />
        {/* <Marker
        coordinate={{
            latitude: location.coords.latitude - 0.002,
            longitude: location.coords.longitude + 0.001,
        }}
        title="Next spot"
        description="Work"
        // image={require('./map.png')}
        // style={{height: 30, width:30 }}
        /> */}
        
        {/* <MapViewDirections
              origin={{latitude: location.coords.latitude - 0.002,
                longitude: location.coords.longitude + 0.001}}
              destination={{latitude: location.coords.latitude - 0.004,
                longitude: location.coords.longitude + 0.009,}}
              apikey={GOOGLE_MAPS_APIKEY}
              stroke={3}
              strokeColor="hotpink"
        /> */}
      {/* {usersMarkers} */}
      </MapView>
    :
    //null
    <Text style={styles.loading}>Finding Location...</Text> 
    }
    {/* <UserMap  
    userLocation={this.state.userLocation}
    userPlaces={this.state.userPlaces}
    /> */}
   <View style={styles.search}> 
     <TextInput
          placeholder="Something Wrong? Enter any adjustments"
          placeholderTextColor="#D3D3D3"
          autoCapitalize="none"
          style={{flex: 1, padding: 0}}
      /> 
      <AntDesign
        name="check"
        size={20}
        color={"#000"}
        />
      {/* <IconButtons
      icon="check"
      color= {tabcolor}
      size={20}
      onPress={() => 
        this.props.navigation.push('Road Analytics')}
      /> */}
   </View>
   <StatusBar barStyle="dark-content" translucent/>
  </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    loading: {
      fontSize: 40,
      alignSelf: 'center'
    },
    search: {
      flex: 1,
      position:'absolute', 
      top: 0,
      marginTop: Platform.OS === 'ios' ? 40 : 20, 
      flexDirection:"row",
      backgroundColor: '#fff',
      width: '90%',
      alignSelf:'center',
      borderRadius: 5,
      padding: 10,
      shadowColor: '#ccc',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 10,
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
    }
  });