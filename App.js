import 'react-native-gesture-handler';

import React from 'react';
import HomeScreen from './Screens/HomeScreen';
import ItemFormScreen from './Screens/ItemFormScreen';
import InventoryScreen from './Screens/InventoryScreen';
import EditItemScreen from './Screens/EditItemScreen';
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { hideNavigationBar } from 'react-native-navigation-bar-color';

const Stack = createStackNavigator();

const App = () => {
  hideNavigationBar();
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Food Stash" component={HomeScreen} />
          <Stack.Screen name="Add Item" component={ItemFormScreen} />
          <Stack.Screen name="Inventory" component={InventoryScreen} />
          <Stack.Screen name="Edit Item" component={EditItemScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
