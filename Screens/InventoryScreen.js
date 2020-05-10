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
        <View style={styles.scrollView}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              onPress={() => handleSortButton('asc', 'name')} 
              style={[styles.quarterButton, styles.baseButton]}>
                <Text style={[styles.bold, styles.baseButtonText]}>&#9650; NAME</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSortButton('desc', 'name')}
              style={[styles.quarterButton, styles.baseButton]}>
                <Text style={[styles.bold, styles.baseButtonText]}>NAME &#9660;</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => handleSortButton('asc', 'expiration')} 
              style={[styles.quarterButton, styles.baseButton]}>
                <Text style={[styles.bold, styles.baseButtonText]}>&#9650; DATE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSortButton('desc', 'expiration')}
              style={[styles.quarterButton, styles.baseButton, styles.quarterButtonLastChild]}>
                <Text style={[styles.bold, styles.baseButtonText]}>DATE &#9660;</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            style={[styles.inventoryListContainer, styles.topBorder]}
            data={list.sort(sortOrder === 'asc' ? sortAsc : sortDesc )}
            renderItem={( {item} ) => (
              <TouchableOpacity style={styles.inventoryItem} key={item.id} onPress={() => navigation.navigate('Edit Item', { itemId: item.id})}>         
                <Text><Text style={styles.itemName}>{item.name.toUpperCase()}</Text></Text>
                <Text><Text style={styles.bold}>Quantity: </Text><Text>{item.quantity}</Text></Text>
                <Text><Text style={styles.bold}>Expiration: </Text><Text>{new Date(Date.parse(item.expiration)).toDateString()}</Text></Text>
              </TouchableOpacity>)}>
          </FlatList>
        </View>
      }
    </SafeAreaView>
  )
}

export default InventoryScreen;