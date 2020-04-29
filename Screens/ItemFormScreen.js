import { SafeAreaView, ScrollView, Text, TextInput, View, Button } from 'react-native';
import React, { useState } from 'react';
import { styles } from '../styles';

const ItemFormScreen = () => {
  const [ itemName, setItemName ] = useState('')
  const [ expirationDate, setExpirationDate ] = useState('')
  const [ quantity, setQuantity ] = useState('0')
  const saveItem = () => {
    console.log(`itemName: ${itemName}; expirationDate: ${expirationDate}, quantity: ${quantity}`)
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.scrollView}>
        <Text style={{ marginBottom: 5 }}>Item</Text>
        <TextInput
          style={styles.basicInput}
          value={itemName}
          onChangeText={itemName => setItemName(itemName)}
        />
        <Text style={{ marginBottom: 5 }}>Expiration Date</Text>
        <TextInput
          style={styles.basicInput}
          value={expirationDate}
          onChangeText={expirationDate => setExpirationDate(expirationDate)}
        />
        <Text style={{ marginBottom: 5 }}>Quantity</Text>
        <TextInput
          style={styles.basicInput}
          value={quantity}
          onChangeText={quantity => setQuantity(quantity)}        />
        <View style={styles.sectionContainer}>
          <Button 
            title="Add"
            onPress={saveItem}  
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ItemFormScreen;