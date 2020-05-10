import {
  StyleSheet
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

export const styles = StyleSheet.create({
  scrollView: {
    margin: 10,
  },
  sectionContainer: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  basicInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10
  },
  formText: {
    marginBottom: 5,
    marginTop: 10
  },
  errorText: {
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 10
  },
  messageText: {
    fontWeight: 'bold',
    marginTop: 10
  },
  bold: {
    fontWeight: 'bold'
  },
  inventoryItem: {
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'darkgrey',
  },
  itemName: {
    color: 'purple',
    fontWeight: 'bold',
    fontSize: 18
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  halfButton: {
    flex: 2,
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    alignItems: 'center',
  },
  redButton: {
    backgroundColor: 'tomato',
    marginLeft: 5,
  },
  yellowButton: {
    backgroundColor: 'gold',
    marginRight: 5
  },
  quarterButton: {
    flex: 4,
    padding: 5,
    marginRight: 10,
    alignItems: 'center',
    backgroundColor: 'lightgray'
  },
  quarterButtonLastChild: {
    marginRight: 0
  }
});
