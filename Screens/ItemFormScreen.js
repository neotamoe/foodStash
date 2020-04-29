import { SafeAreaView, ScrollView, Text, TextInput, View, Button } from 'react-native';
import React from 'react';
import { styles } from '../styles';

const ItemFormScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView style={styles.scrollView}>
        <Text style={{ marginBottom: 5 }}>Item</Text>
        <TextInput
          style={styles.basicInput}
        />
        <Text style={{ marginBottom: 5 }}>Expiration Date</Text>
        <TextInput
          style={styles.basicInput}
        />
        <Text style={{ marginBottom: 5 }}>Quantity</Text>
        <TextInput
          style={styles.basicInput}
        />
        <View style={styles.sectionContainer}>
          <Button 
            title="Add"
            onPress={() => console.log('add pressed')}  
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ItemFormScreen;