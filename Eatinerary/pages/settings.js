import React, { useState } from 'react';
import { TouchableOpacity, ScrollView, StyleSheet, View, Text } from 'react-native';
import { TextInput, Button, useTheme } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import { firebaseConfig, themecolor } from '../config';


export default function Profile() {
  const { colors } = useTheme();
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('Male');
  const [calories, setCalories] = useState(2500);
  const [protein, setProtein] = useState(56);
  const [fat, setFat] = useState(56);
  const [carbs, setCarbs] = useState(281);

  const handleSave = () => {

    const userData = 'Please consider the following metrics for the user: Height is ' + height + ' inches, weight is ' + weight + ' pounds, gender is ' + gender + ". ";
    const moreUserData = "These are the preferred macros for the user: Calories is " + calories + " kcal, protein is " + protein + " grams, fat is " + fat + " grams, carbs is " + carbs + " grams. ";
    
    const totalUserData = userData + moreUserData;

    // const user = firebase.auth().currentUser;
    // if (user) {
    //   console.log("Saving data for UID:", user.uid, {
    //     height,
    //     weight,
    //     gender,
    //     nutrition: { calories, protein, fat, carbs },
    //     goal: "Maintenance"
    //   });
    //   firebase.database().ref(`users/${user.uid}`).set({
    //     height,
    //     weight,
    //     gender,
    //     nutrition: { calories, protein, fat, carbs },
    //     goal: "Maintenance"
    //   }).then(() => {
    //     console.log('Profile saved successfully!');
    //   }).catch(error => {
    //     console.error('Failed to save profile:', error);
    //   });
    // } else {
    //   console.log('No user is logged in!');
    // }
  };

  const updateNutritionByGender = (selectedGender) => {
    switch (selectedGender) {
      case 'Male':
        setCalories(2500);
        setProtein(56);
        setFat(56);
        setCarbs(281);
        break;
      case 'Female':
        setCalories(2000);
        setProtein(46);
        setFat(44);
        setCarbs(225);
        break;
      default:
        setCalories(2000); 
        setProtein(50);
        setFat(20);
        setCarbs(100);
        break;
    }
  };

  const GenderButton = ({ title }) => (
    <Button
      mode={gender === title ? 'contained' : 'outlined'}
      onPress={() => {
        setGender(title);
        updateNutritionByGender(title);
      }}
      style={[styles.genderButton, { backgroundColor: gender === title ? themecolor : 'transparent' }]}
      labelStyle={{ color: gender === title ? 'white' : themecolor }}
    >
      {title}
    </Button>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.label}>Height:</Text>
        <TextInput
          label="Height (in inches)"
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
          mode="outlined"
          style={styles.input}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Weight:</Text>
        <TextInput
          label="Weight (in lbs)"
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
          mode="outlined"
          style={styles.input}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Gender:</Text>
        <View style={styles.genderContainer}>
          <GenderButton title="Male" />
          <GenderButton title="Female" />
          <GenderButton title="Other" />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Macros:</Text>
        <Text style={styles.sliderLabel}>Calories: {calories} kcal</Text>
        <Slider
          style={styles.slider}
          minimumTrackTintColor={themecolor}
          minimumValue={0}
          maximumValue={4000}
          step={100}
          value={calories}
          onValueChange={setCalories}
        />
        <Text style={styles.sliderLabel}>Protein: {protein} g</Text>
        <Slider
          style={styles.slider}
          minimumTrackTintColor={themecolor}
          minimumValue={0}
          maximumValue={300}
          step={10}
          value={protein}
          onValueChange={setProtein}
        />
        <Text style={styles.sliderLabel}>Fat: {fat} g</Text>
        <Slider
          style={styles.slider}
          minimumTrackTintColor={themecolor}
          minimumValue={0}
          maximumValue={100}
          step={5}
          value={fat}
          onValueChange={setFat}
        />
        <Text style={styles.sliderLabel}>Carbs: {carbs} g</Text>
        <Slider
          style={styles.slider}
          minimumTrackTintColor={themecolor}
          minimumValue={0}
          maximumValue={500}
          step={10}
          value={carbs}
          onValueChange={setCarbs}
        />
        <TouchableOpacity activeOpacity={1} onPress={handleSave}>
          <Text style={styles.saveSettings}>Save Settings</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  section: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  saveSettings: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    color: {themecolor},
  },
  label: {
    fontSize: 18,
    color: '#0D5C63',
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  sliderLabel: {
    fontSize: 16,
    color: {themecolor},
    marginBottom: 5,
  },
  slider: {
    color: {themecolor},
    width: '100%',
    height: 40,
  },
  genderContainer: {
    color: '#0D5C63',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  genderButton: {
    color: '#0D5C63',
    flex: 1,
    marginHorizontal: 5,
  },
  saveButton: {
    marginTop: 20,
  },
});