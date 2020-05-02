import { SafeAreaView, ScrollView, Text, TextInput, View, Button } from 'react-native';
import React, { useState } from 'react';
import { styles } from '../styles';
import DateTimePicker from '@react-native-community/datetimepicker';

const ItemFormScreen = () => {
  const [ itemName, setItemName ] = useState()
  const [ expirationDate, setExpirationDate ] = useState()
  const [ quantity, setQuantity ] = useState()
  const [showDatepicker, setShowDatepicker] = useState(false)
  const [showError, setShowError] = useState(false)
  const [error, setError] = useState("All fields must have a value.")

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || expirationDate;
    setShowDatepicker(false);
    setExpirationDate(currentDate);
  };
  const saveItem = () => {
    if(!checkFormFields()){ 
      setShowError(true) 
    }
    console.log(`itemName: ${itemName}; expirationDate: ${expirationDate}, quantity: ${quantity}`)
  }
  const showDatepickerUI = () => {
    setShowDatepicker(true);
  };

  const checkFormFields = () => {
    console.log((itemName !== undefined && expirationDate !== undefined && quantity !== undefined))
    return (itemName !== undefined && expirationDate !== undefined && quantity !== undefined)
  }


  return (
    <SafeAreaView>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.formText}>Item</Text>
        <TextInput
          style={styles.basicInput}
          value={itemName}
          onChangeText={itemName => setItemName(itemName)}
        />
        <Text style={styles.formText}>Quantity</Text>
        <TextInput
          style={styles.basicInput}
          value={quantity}
          onChangeText={quantity => setQuantity(quantity)}        />
        <Text style={styles.formText}>Expiration Date: {expirationDate ? expirationDate.toDateString() : null}</Text>
        { showDatepicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={expirationDate ? expirationDate : new Date()}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
        <Button onPress={showDatepickerUI} title="Choose Date" />
        <View style={styles.sectionContainer}>
          { showError ?
            <Text style={styles.errorText}>{error}</Text>
            : null
          }
          <Button 
            title="Add to Inventory"
            onPress={saveItem}
            color="green"
            accessibilityLabel="add item to inventory" 
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ItemFormScreen;