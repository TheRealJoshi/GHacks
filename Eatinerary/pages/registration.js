import React, { useEffect, useState, useCallback, version } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import  { GoogleGenerativeAI } from "@google/generative-ai"
import { GiftedChat } from 'react-native-gifted-chat'
import dataset from './dataset'

export default function Chat() {
  const [messages, setMessages] = useState([])
  const [counter, setCounter] = useState(3);
  const [diningHallData, setDiningHallData] = useState("");
  const [nutritionData, setNutritionData] = useState("");

  
  const [historySoFar, setHistorySoFar] = useState([ // add history
]);

async function getNutritionDetails(){
  fetch('https://api.nal.usda.gov/fdc/v1/foods/search?api_key=wY3vcgA7bZEe53SlGBMsIIXyhWyfeb6Dsj3AjL5j&query=Do they have palak paneer')
  .then(response => response.text())
  .then(data => {
    setNutritionData(nutritionData);
  })
  .catch(error => {
    console.error('An error occurred:', error);
  });
}

async function getDiningHallData(){
  await getNutritionDetails();
  fetch('https://michigan-dining-api.tendiesti.me/v1/filterableEntries')
    .then(response => response.text())
    .then(data => {
      setDiningHallData(data)
      setMessages([
        {
          _id: 1,
          text: 'Hello fellow Eatiterator! Give me a moment as I retrieve information about the dining halls.',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://cdn.dribbble.com/userupload/11836407/file/original-8a90883ffdb358883d996e9e6dd4731d.png',
          },
        }
      ])
      console.log(historySoFar);
      // "here is a string of all dining hall information, please refer to it for future questions: " + data +
      runAll( ". Here are acronyms and addresses associated with places on campus in json format." + JSON.stringify(dataset));
      console.log(diningHallData)
      // const genAI = new GoogleGenerativeAI("AIzaSyBy6QcQEIsZirBsIGzYO2S4YQ2A08jxPbw");
      // const model = genAI.getGenerativeModel({ model: "gemini-pro"});

      // const chat = model.startChat({
      //   history: historySoFar,
      //   messages,
      //   // generationConfig: {
      //   //   maxOutputTokens: 1000,
      //   // },
      // });

    })
    .catch(error => {
      setDiningHallData("An error has occurred");
      console.error('An error occurred:', error);
    });
}

  useEffect(() => {
    getDiningHallData();
  }, [])

  const onSend = useCallback((messages = []) => {
    // console.log("yooo" + );
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )
    runAll(messages[0].text);
  }, [])
  // example data strucure for the messagees

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
                // generationConfig: {
                //   maxOutputTokens: 1000,
                // },
              });
            
            // const msg = "Who am I?";
            console.log(data);
            // Please reference the json string I provided to you before. That is all real-time current updated information about dining halls on umich campus. Now please answer the following prompt:
            // ". Please list everything out and do not hallucinate from any information other than what I have provided. Be concise and do not add any extra information." + "List it your answer with the format <Item> - <Item Details>" +
            const msg =  data ;
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
              

              setMessages(previousMessages =>
                GiftedChat.append(previousMessages, struct),
              )

              setHistorySoFar(historySoFar.concat([
                {
                  role: "user",
                  parts: [{ text: data }],
                },
                {
                  role: "model",
                  parts: [{ text: text }],
                },
              ]));

            //   setHistorySoFar.push([ // add history
            //   {
            //     role: "user",
            //     parts: [{ text: data }],
            //   },
            //   {
            //     role: "model",
            //     parts: [{ text: text }],
            //   },
            // ]);
              // 
            // ...
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }
    return (
      <GiftedChat
      messages={messages}
      onSend={messages => {
        onSend(messages)
        // runAll();
      }}
      user={{
        _id: 1,
      }}
    />
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
  