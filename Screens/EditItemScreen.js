import { ScrollView, Text, TextInput, View, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { styles } from '../styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-community/async-storage';
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';
import { SafeAreaView } from 'react-native-safe-area-context';

const EditItemScreen = ({ route, navigation }) => {
  const { itemId } = route.params
  const [ itemName, setItemName ] = useState()
  const [ expirationDate, setExpirationDate ] = useState()
  const [ quantity, setQuantity ] = useState()
  const [showDatepicker, setShowDatepicker] = useState(false)
  const [showError, setShowError] = useState(false)
  const [error, setError] = useState("All fields must have a value.")
  const [indexToEdit, setIndexToEdit] = useState()
  const [ listObject, setListObject ] = useState()

  const getItem = async () => {
    try {
      const storedList = await AsyncStorage.getItem('inventory')
      const listObject = JSON.parse(storedList)
      setListObject(listObject)
      console.log(`EDIT: inventory list object: ${JSON.stringify(listObject)}`)
      const itemToEdit = listObject.find((item) => item.id === itemId)
      setItemName(itemToEdit.name)
      setExpirationDate(itemToEdit.expiration)
      setQuantity(itemToEdit.quantity)
      const indexToEdit = listObject.indexOf(itemToEdit)
      setIndexToEdit(indexToEdit)
    } catch(e) {
      console.error(`error getting inventory: ${e}`)
    }
  }

  const saveEditedItem = async () => {
    try {
      // const storedList = await AsyncStorage.getItem('inventory')
      // const listObject = JSON.parse(storedList)
      const revisedItem = {
        id: itemId,
        name: itemName,
        quantity: quantity,
        expiration: expirationDate
      }
      console.log('revisedItem:')
      console.log(revisedItem)
      listObject[indexToEdit] = revisedItem
      console.log(listObject)
      await AsyncStorage.setItem('inventory', JSON.stringify(listObject))
      navigation.navigate('Inventory')
    } catch(e) {
      console.error(`error getting inventory: ${e}`)
    }
  }

  useEffect(() => {
    getItem()
  }, []); 

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || expirationDate;
    setShowDatepicker(false);
    setExpirationDate(currentDate);
  };
  const saveItem = () => {
    if(!checkFormFields()){ 
      setShowError(true) 
    }
    saveEditedItem()
    console.log(`saving item => itemName: ${itemName}; expirationDate: ${expirationDate}, quantity: ${quantity}`)
  }
  const showDatepickerUI = () => {
    setShowDatepicker(true);
  };

  const checkFormFields = () => {
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
        <Text style={styles.formText}>Expiration Date: {expirationDate ? new Date(Date.parse(expirationDate)).toDateString() : null}</Text>
        { showDatepicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={expirationDate ? new Date(Date.parse(expirationDate)) : new Date()}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
        <Button onPress={showDatepickerUI} title="Change Date" />
        <View style={styles.sectionContainer}>
          { showError ?
            <Text style={styles.errorText}>{error}</Text>
            : null
          }
          <Button 
            title="Save Changes"
            onPress={saveItem}
            color="green"
            accessibilityLabel="add item to inventory" 
          />
        </View>
        <View style={styles.sectionContainer}>
          <Button 
            title="Cancel"
            onPress={() => { navigation.navigate('Inventory')}}
            color="gold"
            accessibilityLabel="cancel" 
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default EditItemScreen;