import { SafeAreaView, ScrollView, Text, View } from 'react-native';
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

  return (
    <SafeAreaView>
      <ScrollView style={styles.scrollView}>
        {
          list.map((item, index) => (
            <View key={index}>
              <Text>{item.name}</Text>
              <Text>{item.quantity}</Text>
              <Text>{item.expiration}</Text>
            </View>
          ))
        }
      </ScrollView>
    </SafeAreaView>
  )
}

export default InventoryScreen;