// import { StatusBar } from 'expo-status-bar';
// import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';

// import React, { useState } from 'react';
// import Task from './Task';



// import TodoItem from './Task';

// export default function Profile() {
//   const [task, setTask] = useState();
//   const [taskItems, setTaskItems] = useState([]);

//   const handleAddTask = () => {
//     Keyboard.dismiss();
//     setTaskItems([...taskItems, task])
//     setTask(null);
//   }

//   const completeTask = (index) => {
//     let itemsCopy = [...taskItems];
//     itemsCopy.splice(index, 1);
//     setTaskItems(itemsCopy)
//   }

//   return (
//     <View style={styles.container}>
//       {/* Added this scroll view to enable scrolling when list gets longer than the page */}
//       <ScrollView
//         contentContainerStyle={{
//           flexGrow: 1
//         }}
//         keyboardShouldPersistTaps='handled'
//       >

//       {/* Today's Tasks */}
//       <View style={styles.tasksWrapper}>
//         <Text style={styles.sectionTitle}>Today's tasks</Text>
//         <View style={styles.items}>
//           {/* This is where the tasks will go! */}
//           {
//             taskItems.map((item, index) => {
//               return (
//                 <TouchableOpacity key={index}  onPress={() => completeTask(index)}>
//                   <Task text={item} /> 
//                 </TouchableOpacity>
//               )
//             })
//           }
//         </View>
//       </View>
//       </ScrollView>
//       <View style={styles.sectionBottom}>
//       <Text style={styles.sectionBottom}>View Map</Text>
//       </View>
//     </View>
//   );
// }
  
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   tasksWrapper: {
//     paddingTop: 80,
//     paddingHorizontal: 20,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: 'bold'
//   },
//   sectionBottom: {
//     color: 'blue',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     marginBottom: 20,
//     fontSize: 19
//   },
//   items: {
//     marginTop: 30,
//   },
//   writeTaskWrapper: {
//     position: 'absolute',
//     bottom: 60,
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center'
//   },
//   input: {
//     paddingVertical: 15,
//     paddingHorizontal: 15,
//     backgroundColor: '#FFF',
//     borderRadius: 60,
//     borderColor: '#C0C0C0',
//     borderWidth: 1,
//     width: 250,
//   },
//   addWrapper: {
//     width: 60,
//     height: 60,
//     backgroundColor: '#FFF',
//     borderRadius: 60,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderColor: '#C0C0C0',
//     borderWidth: 1,
//   },
//   addText: {},
// });

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const events = [
  { id: 1, name: "GHacks Hackathon", time: "9 – 10:30am", location: "Central Campus Classroom Building" },
  { id: 2, name: "Math Class", time: "11am - 12pm", location: "Weiser Hall" },
  { id: 3, name: "Coffee Chat", time: "1pm - 2pm", location: "Starbucks" },
  { id: 4, name: "EECS445 Discussion", time: "3:30pm - 4:30pm", location: "GGBL Building" },
];

const Schedule = () => {
  const currentDate = new Date().toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
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

export default Schedule;
