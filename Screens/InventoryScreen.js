import { FlatList, Text, View, TouchableOpacity, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { styles } from '../styles'
import { SafeAreaView } from 'react-native-safe-area-context';
import { hideNavigationBar } from 'react-native-navigation-bar-color';

const InventoryScreen = ({navigation}) => {
  const [list, setList] = useState([])
  const [sortByProperty, setSortByProperty] = useState('expiration')
  const [sortOrder, setSortOrder] = useState('asc')

  const getData = async () => {
    try {
      const storedList = await AsyncStorage.getItem('inventory')
      if(storedList !== null) {
        const listObject = JSON.parse(storedList)
        const sortedList = listObject.sort(sortOrder === 'asc' ? sortAsc : sortDesc )
        setList(sortedList)
      }
    } catch(e) {
      console.error(`error getting inventory: ${e}`)
    }
  }

  const sortDesc = (a, b) => {
    var itemA = a[sortByProperty].toUpperCase(); // ignore upper and lowercase
    var itemB = b[sortByProperty].toUpperCase(); // ignore upper and lowercase
    if (itemA > itemB) {
      return -1;
    }
    if (itemA < itemB) {
      return 1;
    }
    return 0;
  }

  const sortAsc = (a, b) => {
    var itemA = a[sortByProperty].toUpperCase(); // ignore upper and lowercase
    var itemB = b[sortByProperty].toUpperCase(); // ignore upper and lowercase
    if (itemA < itemB) {
      return -1;
    }
    if (itemA > itemB) {
      return 1;
    }
    return 0;
  }

  const handleSortButton = (order, property) => {
    setSortByProperty(property)
    setSortOrder(order)
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData()
      hideNavigationBar()
    })
    return unsubscribe
  }, [navigation]);
  
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
      { list.length === 0 ? 
        <View style={styles.scrollView}>
          <Text style={styles.sectionDescription}>
            No Items in Inventory.
          </Text>
          <View style={styles.sectionContainer}>
            <Button onPress={() => navigation.navigate('Add Item')} title="Add Item" />
          </View>
        </View> 
        : 
        <>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              onPress={() => handleSortButton('asc', 'name')} 
              style={styles.quarterButton}>
                <Text style={styles.bold}>&#9650; NAME</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSortButton('desc', 'name')}
              style={styles.quarterButton}>
                <Text style={styles.bold}>NAME &#9660;</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => handleSortButton('asc', 'expiration')} 
              style={styles.quarterButton}>
                <Text style={styles.bold}>&#9650; DATE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSortButton('desc', 'expiration')}
              style={styles.quarterButton}>
                <Text style={styles.bold}>DATE &#9660;</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            style={styles.scrollView}
            data={list.sort(sortOrder === 'asc' ? sortAsc : sortDesc )}
            renderItem={( {item} ) => (
              <View style={styles.inventoryItem} key={item.id}>         
                <Text><Text style={styles.itemName}>{item.name.toUpperCase()}</Text></Text>
                <Text><Text style={styles.bold}>Quantity: </Text><Text>{item.quantity}</Text></Text>
                <Text><Text style={styles.bold}>Expiration: </Text><Text>{new Date(Date.parse(item.expiration)).toDateString()}</Text></Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity 
                    onPress={() => navigation.navigate('Edit Item', { itemId: item.id})} 
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
        </>
      }
    </SafeAreaView>
  )
}

export default InventoryScreen;