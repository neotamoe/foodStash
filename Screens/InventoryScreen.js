import { Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const InventoryScreen = () => {
  const [list, setList] = useState([])

  const getData = async () => {
    try {
      const storedList = await AsyncStorage.getItem('inventory')
      if(storedList !== null) {
        // value previously stored
        const listObject = JSON.parse(storedList)
        setList(listObject)
        console.log(`inventory list object: ${JSON.stringify(listObject)}`)
      }
    } catch(e) {
      // error reading value
      console.error(`error getting inventory: ${e}`)
    }
  }

  useEffect(() => {
    getData()
  }, []); 

  return (
    <Text>Inventory Screen</Text>
  )
}

export default InventoryScreen;