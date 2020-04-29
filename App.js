import 'react-native-gesture-handler';

import React from 'react';
import HomeScreen from './Screens/HomeScreen';
import ItemFormScreen from './Screens/ItemFormScreen';
import InventoryScreen from './Screens/InventoryScreen';
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Food Stash" component={HomeScreen} />
        <Stack.Screen name="Add Item" component={ItemFormScreen} />
        <Stack.Screen name="View Inventory" component={InventoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
