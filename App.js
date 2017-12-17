import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Main from './App/components/Main';
import Dashboard from './App/components/Dashboard';
import Profile from './App/components/Profile';
import Repos from './App/components/Repos';
import Notes from './App/components/Notes';
import Web_View from './App/components/Helpers/Web_View';

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu</Text>
      </View>
    );
  }
}

const Navigator = StackNavigator({
  Home: { screen: App },
  Main: { screen: Main },
  Dashboard: { screen: Dashboard },
  Profile: { screen: Profile },
  Repos: { screen: Repos },
  Notes: { screen: Notes },
  Web_View: { screen: Web_View }
}, {
  initialRouteName: 'Main',
  navigationOptions: {
      title: 'Github Notetaker',
      headerTitleStyle: {
        alignSelf: 'center'}
    }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Navigator;
