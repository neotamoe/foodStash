import React from 'react';

import {
  ScrollView,
  View,
  StatusBar,
  TouchableOpacity,
  Text
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
            <TouchableOpacity 
              onPress={() => navigation.navigate('Inventory')}
              style={styles.baseButton}>
              <Text style={[styles.bold, styles.baseButtonText]}>
                VIEW INVENTORY
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.sectionContainer}>
            <TouchableOpacity 
              onPress={() => navigation.navigate('Add Item')}
              style={styles.baseButton}>
              <Text style={[styles.bold, styles.baseButtonText]}>
                ADD ITEM
              </Text>
            </TouchableOpacity>            
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};


export default HomeScreen;
