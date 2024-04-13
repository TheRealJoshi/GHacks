import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

export default function Profile() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('Male');
  const [calories, setCalories] = useState(2000);
  const [protein, setProtein] = useState(50);
  const [fat, setFat] = useState(20);
  const [carbs, setCarbs] = useState(100);

  return (
    <ScrollView style={styles.container}>
      <TextInput
        label="Height (in inches)"
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Weight (in lbs)"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
        mode="outlined"
        style={styles.input}
      />
      <Text style={styles.label}>Gender:</Text>
      <Picker
        selectedValue={gender}
        onValueChange={(itemValue) => setGender(itemValue)}
        style={styles.picker}>
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
        <Picker.Item label="Other" value="Other" />
      </Picker>
      <Text style={styles.label}>Macros:</Text>
      <Text>Calories: {calories} kcal</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={4000}
        step={100}
        value={calories}
        onValueChange={setCalories}
      />
      <Text>Protein: {protein} g</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={300}
        step={10}
        value={protein}
        onValueChange={setProtein}
      />
      <Text>Fat: {fat} g</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={100}
        step={5}
        value={fat}
        onValueChange={setFat}
      />
      <Text>Carbs: {carbs} g</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={500}
        step={10}
        value={carbs}
        onValueChange={setCarbs}
      />
      <Button mode="contained" onPress={() => console.log('Data Saved')}>
        Save Profile
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#000',
    marginTop: 20,
    marginBottom: 5,
  },
  picker: {
    width: '100%',
    height: 44,
  },
  slider: {
    width: '100%',
    height: 40,
  },
});
