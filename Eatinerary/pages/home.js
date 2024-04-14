import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react'
// import { genAI } from "./../gemini/common";
// const { GoogleGenerativeAI } = require("@google/generative-ai");
import { StyleSheet, Text, TouchableOpacity, View, Button, Image, ScrollView } from 'react-native';
import  { GoogleGenerativeAI } from "@google/generative-ai"
import * as ImagePicker from 'expo-image-picker';
// const fs = require("fs");

export default function Home() {
  const events = [
    { id: 1, name: "GHacks Hackathon", time: "9 – 10:30am", location: "Central Campus Classroom Building" },
    { id: 2, name: "Math Class", time: "11am - 12pm", location: "Weiser Hall" },
    { id: 3, name: "Coffee Chat", time: "1pm - 2pm", location: "Starbucks" },
    { id: 4, name: "EECS445 Discussion", time: "3:30pm - 4:30pm", location: "GGBL Building" },
  ];
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);

    // async function runAll() {
    //     try {
    //         // Perform asynchronous operations here
    //         const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    //         const prompt = "Does this look store-bought or homemade?";
    //         const image = {
    //         inlineData: {
    //             data: base64EncodedImage /* see JavaScript quickstart for details */,
    //             mimeType: "image/png",
    //         },
    //         };

    //         const result = await model.generateContent([prompt, image]);
    //         console.log(result.response.text());
    //         // ...
    //     } catch (error) {
    //         console.error('An error occurred:', error);
    //     }
    // }

    // Access your API key as an environment variable (see "Set up your API key" above)

    const [imageB, setImage] = useState(null);
    const currentDate = new Date().toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      const options = { base64: true };
      let result = await ImagePicker.launchImageLibraryAsync(options, {
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      // console.log(result.assets[0].base64);
      // if (!result.cancelled) {
        // const base64EncodedImage = await fileToBase64(result.uri);
        // console.log(base64EncodedImage);
      // }
      // setImage(result.assets[0].uri);
      setImage(result.assets[0].base64);
    };
  
    async function fileToGenerativePart(file) {
      const base64EncodedDataPromise = new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.readAsDataURL(file);
      });
      return {
        inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
      };
    }
  
    async function processImage(given) {
      try {
        const genAI = new GoogleGenerativeAI("AIzaSyBy6QcQEIsZirBsIGzYO2S4YQ2A08jxPbw");
  
        // const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest"}, { apiVersion: "v1beta" });
        
    
        const prompt = "What is the most optimal path for this schedule? Consider it like the travelling salesman problem where every red marker is a location to be visited.";
        // const image = fileToGenerativePart("./lemonade.png");
    
        const image = {
          inlineData: {
            data: imageB,
            mimeType: "image/png",
          },
        };
        
        const result = await model.generateContent([prompt, image]);
        // const result = await model.generateContent([prompt, imageB]);

        console.log(result.response.text());

      } catch (error) {
        console.log(error);
      }
    }
  

    return (        
        <View style={styles.container}>
          <Text style={styles.date}>{currentDate}</Text>
          <ScrollView style={styles.eventContainer}>
            {events.map((event) => (
              <View key={event.id} style={styles.eventCard}>
                <Text style={styles.eventName}>{event.name}</Text>
                <Text style={styles.eventTime}>{event.time}</Text>
                <Text style={styles.eventLocation}>{event.location}</Text>
              </View>
            ))}
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            <TouchableOpacity onPress={() => processImage()} style={{alignContent: 'center', alignItems: 'center'}}>
              <Text>Eatinerate!</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: 50,
    },
    date: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      padding: 10,
      color: '#2A9D8F',
      fontFamily: 'Roboto-Bold', // Ensure the font is correctly linked in your project settings
    },
    eventContainer: {
      flex: 1,
      marginVertical: 20, // Add margin to create space between the date and events
    },
    eventCard: {
      backgroundColor: '#2A9D8F',
      borderRadius: 10,
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      fontFamily: 'Roboto-Regular', // Ensure the font is correctly linked in your project settings
    },
    eventName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
    },
    eventTime: {
      fontSize: 16,
      color: 'white',
    },
    eventLocation: {
      fontSize: 16,
      color: 'white',
    },
  });
