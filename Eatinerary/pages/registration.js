import React, { useEffect, useState, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import  { GoogleGenerativeAI } from "@google/generative-ai"
import { GiftedChat } from 'react-native-gifted-chat'

export default function Chat() {
  const [messages, setMessages] = useState([])
  const [counter, setCounter] = useState(3);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    // console.log("yooo" + );
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )
    runAll(messages[0].text);
  }, [])
  // example data strucure for the messagees
  // history: [ 
  //   {
  //     role: "user",
  //     parts: [{ text: "Hello, I have 2 dogs in my house." }],
  //   },
  //   {
  //     role: "model",
  //     parts: [{ text: "Great to meet you. What would you like to know?" }],
  //   },
  // ],

  async function runAll(data) {
    // For text-and-image input (multimodal), use the gemini-pro-vision model
        try {
            //  = process.env.API_SECRET
            const genAI = new GoogleGenerativeAI("AIzaSyBy6QcQEIsZirBsIGzYO2S4YQ2A08jxPbw");
            // const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
            const model = genAI.getGenerativeModel({ model: "gemini-pro"});

            const chat = model.startChat({
                // history: [
                //   {
                //     role: "user",
                //     parts: [{ text: "Hello, I have 2 dogs in my house." }],
                //   },
                //   {
                //     role: "model",
                //     parts: [{ text: "Great to meet you. What would you like to know?" }],
                //   },
                // ],
                messages,
                generationConfig: {
                  maxOutputTokens: 100,
                },
              });
            
            // const msg = "Who am I?";
            console.log(data);
            const result = await chat.sendMessage(data);
              const response = await result.response;
              const text = response.text();
              console.log(text);
              setCounter(counter + 1);
              console.log("responses length is " + messages.length);
              const struct = [{
                _id: counter,
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
  