import { SafeAreaView, ScrollView, Text, TextInput, View, Button } from 'react-native';
import React, { useState } from 'react';
import { styles } from '../styles';
import DateTimePicker from '@react-native-community/datetimepicker';

const ItemFormScreen = () => {
  const [ itemName, setItemName ] = useState('')
  const [ expirationDate, setExpirationDate ] = useState(new Date())
  const [ quantity, setQuantity ] = useState('0')
  const [show, setShow] = useState(false);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || expirationDate;
    setShow(false);
    setExpirationDate(currentDate);
  };
  const saveItem = () => {
    console.log(`itemName: ${itemName}; expirationDate: ${expirationDate}, quantity: ${quantity}`)
  }
  const showDatepicker = () => {
    setShow(true);
  };


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
        <Text style={styles.formText}>Expiration Date: {expirationDate.toDateString()}</Text>
        { show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={expirationDate}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
        <Button onPress={showDatepicker} title="Choose Date" />
        <View style={styles.sectionContainer}>
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