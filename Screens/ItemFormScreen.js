import { ScrollView, Text, TextInput, View, Button } from 'react-native';
import React, { useState } from 'react';
import { styles } from '../styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-community/async-storage';
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';
import { SafeAreaView } from 'react-native-safe-area-context';
import { hideNavigationBar } from 'react-native-navigation-bar-color';

const ItemFormScreen = ({ navigation }) => {
  const [ itemName, setItemName ] = useState()
  const [ expirationDate, setExpirationDate ] = useState()
  const [ quantity, setQuantity ] = useState()
  const [showDatepicker, setShowDatepicker] = useState(false)
  const [showError, setShowError] = useState(false)
  const [error, setError] = useState("All fields must have a value.")
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState("Item added to inventory.")

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || expirationDate;
    setShowDatepicker(false);
    setExpirationDate(currentDate);
  };
  const saveItem = () => {
    hideNavigationBar()
    setShowMessage(false)
    setShowError(false)
    if(!checkFormFields()){ 
      return setShowError(true) 
    }
    storeData()
    console.log(`saving item => itemName: ${itemName}; expirationDate: ${expirationDate}, quantity: ${quantity}`)
    setItemName()
    setExpirationDate()
    setQuantity()
  }
  const showDatepickerUI = () => {
    setShowDatepicker(true);
  };

  const checkFormFields = () => {
    return (itemName !== undefined && expirationDate !== undefined && quantity !== undefined)
  }

  const storeData = async () => {
    const item = {
      id: uuidv4(),
      name: itemName,
      expiration: expirationDate,
      quantity: quantity
    }
    try {
      let currentInventory = await AsyncStorage.getItem('inventory')
      if(currentInventory === null) {
        currentInventory = [item]
      } else {
        currentInventory = JSON.parse(currentInventory)
        currentInventory.push(item)
      }
      await AsyncStorage.setItem('inventory', JSON.stringify(currentInventory))
      setShowMessage(true)
    } catch (e) {
      console.error(`error saving data: ${e}`)
    }
  }

  return (
    <SafeAreaView>
      <View style={styles.scrollView}>
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
          { showMessage ?
            <Text style={styles.messageText}>{message}</Text>
            : null
          }
        </View>
        <View style={styles.sectionContainer}>
          <Button 
            title="Go to Inventory"
            onPress={() => navigation.navigate('Inventory')}
            color="gold"
            accessibilityLabel="go to inventory" 
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ItemFormScreen;