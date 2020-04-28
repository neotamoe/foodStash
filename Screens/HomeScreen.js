import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
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
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Some initial text
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                Some text
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                Some other text
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Button 
                title="Add Item"
                onPress={() => navigation.navigate('Add Item')}  
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};


export default HomeScreen;
