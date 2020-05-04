import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  View,
  StatusBar,
  Button
} from 'react-native';

import { styles } from '../styles';

const HomeScreen = ({ navigation }) => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.sectionContainer}>
            <Button 
              title="View Inventory"
              onPress={() => navigation.navigate('Inventory')}  
            />
          </View>
          <View style={styles.sectionContainer}>
            <Button 
              title="Add Item"
              onPress={() => navigation.navigate('Add Item')}  
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};


export default HomeScreen;
