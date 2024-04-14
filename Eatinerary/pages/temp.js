import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react'
// import { genAI } from "./../gemini/common";
// const { GoogleGenerativeAI } = require("@google/generative-ai");
import { StyleSheet, Text, TouchableOpacity, View, Button, Image } from 'react-native';
import  { GoogleGenerativeAI } from "@google/generative-ai"
import * as ImagePicker from 'expo-image-picker';
// const fs = require("fs");

export default function Home() {
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
        <Text>Open up App.js to start working on your app!</Text>
        <TouchableOpacity onPress={() => processImage()}>
            <Text>Run Gemini</Text>
        </TouchableOpacity>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
      {/* {image && <Image source={{ uri: image }} style={styles.image} />}
        <StatusBar style="auto" />
        <Text>{image}</Text> */}
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
  