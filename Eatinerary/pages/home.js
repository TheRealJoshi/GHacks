import { StatusBar } from 'expo-status-bar';
// import { genAI } from "./../gemini/common";
// const { GoogleGenerativeAI } = require("@google/generative-ai");
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import  { GoogleGenerativeAI } from "@google/generative-ai"
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


    // Converts local file information to a GoogleGenerativeAI.Part object.
    // function fileToGenerativePart(path, mimeType) {
    // return {
    //     inlineData: {
    //     data: Buffer.from(fs.readFileSync(path)).toString("base64"),
    //     mimeType
    //     },
    // };
    // }

    // function fileToGenerativePart(file) {
    //     return new Promise((resolve, reject) => {
    //       const reader = new FileReader();
      
    //       reader.onload = function() {
    //         // result attribute contains the data as a base64-encoded string
    //         resolve({
    //           inlineData: {
    //             data: reader.result.split(',')[1], // Remove the Data URI scheme prefix
    //             mimeType: file.type
    //           }
    //         });
    //       };
      
    //       reader.onerror = reject;
      
    //       reader.readAsDataURL(file); // Read the file's content as a Data URL
    //     });
    //   }
    // async function fileToGenerativePart(file) {
    //     const base64EncodedDataPromise = new Promise((resolve) => {
    //       const reader = new FileReader();
    //       reader.onloadend = () => resolve(reader.result.split(',')[1]);
    //       reader.readAsDataURL(file);
    //     });
    //     return {
    //       inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    //     };
    //   }
    //   const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    // const prompt = "What's different between these pictures?";

    // const imageParts = [
    //     fileToGenerativePart("image1.png", "image/png"),
    //     fileToGenerativePart("image2.jpeg", "image/jpeg"),
    // ];

    // const result = await model.generateContent([prompt, ...imageParts]);
    // const response = await result.response;
    // const text = response.text();
    // console.log(text);


    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <TouchableOpacity onPress={() => runAll()}>
            <Text>Run Gemini</Text>
        </TouchableOpacity>
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
  