import { SafeAreaView, FlatList, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { styles } from '../styles'

const InventoryScreen = () => {
  const [list, setList] = useState([])

  const getData = async () => {
    try {
      const storedList = await AsyncStorage.getItem('inventory')
      if(storedList !== null) {
        const listObject = JSON.parse(storedList)
        setList(listObject)
        console.log(`inventory list object: ${JSON.stringify(listObject)}`)
      }
    } catch(e) {
      console.error(`error getting inventory: ${e}`)
    }
  }

  useEffect(() => {
    getData()
  }, []); 

  const deleteItem = async (id) => {
    try {
      const storedList = await AsyncStorage.getItem('inventory')
      const listObject = JSON.parse(storedList)
      console.log(`inventory list object: ${JSON.stringify(listObject)}`)
      const remainingItems = listObject.filter((item) => item.id !== id)
      console.log(remainingItems)
      await AsyncStorage.setItem('inventory', JSON.stringify(remainingItems))
      setList(remainingItems)
    } catch(e) {
      console.error(`error getting inventory: ${e}`)
    }
  }

  return (
    <SafeAreaView>
      { list.length === 0 ? <View style={styles.scrollView}><Text style={styles.sectionDescription}>No Items in Inventory.</Text></View> : null }
      <FlatList
        style={styles.scrollView}
        data={list}
        renderItem={( {item} ) => (
          <View style={styles.inventoryItem} key={item.id}>         
            <Text><Text style={styles.itemName}>{item.name.toUpperCase()}</Text></Text>
            <Text><Text style={styles.bold}>Quantity: </Text><Text>{item.quantity}</Text></Text>
            <Text><Text style={styles.bold}>Expiration: </Text><Text>{new Date(Date.parse(item.expiration)).toDateString()}</Text></Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                onPress={() => console.log(`edit: ${item.id}`)} 
                style={[styles.halfButton, styles.yellowButton]}>
                  <Text style={styles.bold}>EDIT</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => deleteItem(item.id)}
                style={[styles.halfButton, styles.redButton]}>
                  <Text style={styles.bold}>DELETE</Text>
              </TouchableOpacity>
            </View>
          </View>)}>
      </FlatList>
    </SafeAreaView>
  )
}

export default InventoryScreen;