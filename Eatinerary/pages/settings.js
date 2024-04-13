import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { TextInput, Button, useTheme } from 'react-native-paper';
import Slider from '@react-native-community/slider';


export default function Profile() {
  const { colors } = useTheme();
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('Male');
  const [calories, setCalories] = useState(2000);
  const [protein, setProtein] = useState(50);
  const [fat, setFat] = useState(20);
  const [carbs, setCarbs] = useState(100);

  const GenderButton = ({ title }) => (
    <Button
      mode={gender === title ? 'contained' : 'outlined'}
      onPress={() => setGender(title)}
      style={styles.genderButton}
      labelStyle={gender === title ? { color: 'white' } : { color: colors.primary }}
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
          minimumValue={0}
          maximumValue={4000}
          step={100}
          value={calories}
          onValueChange={setCalories}
        />
        <Text style={styles.sliderLabel}>Protein: {protein} g</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={900}
          step={10}
          value={protein}
          onValueChange={setProtein}
        />
        <Text style={styles.sliderLabel}>Fat: {fat} g</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          step={5}
          value={fat}
          onValueChange={setFat}
        />
        <Text style={styles.sliderLabel}>Carbs: {carbs} g</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={500}
          step={10}
          value={carbs}
          onValueChange={setCarbs}
        />
      </View>
      <View style={styles.container}>
      <Button
        mode="contained"
        onPress={() => console.log('Data Saved')}
        style={styles.button}
        labelStyle={styles.buttonText}
      >
        Save Profile
      </Button>
    </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#6200ee',  // Example: Purple color
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 4,
    elevation: 3,  // Shadow for Android
  },
  buttonText: {
    color: '#FFFFFF',  // Ensuring text color is white for better readability
    fontSize: 16,
    lineHeight: 26,  // Increasing line height for better text alignment
  },
  container: {
    flex: 1,
    padding: 10,
  },
  section: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    color: '#000',
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  sliderLabel: {
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  genderButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  saveButton: {
    marginTop: 20,
  },
});
