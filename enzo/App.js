import React from 'react';
import { StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';
import WelcomScreen from './Components/WelcomScreen';
import BarCodeScreen from './Components/BarCodeScreen';
import ExpiraitonDateScreen from './Components/ExpiraitonDateScreen';
import BarCodePicker from './Components/BarCodePicker';
import DatePicker from './Components/DatePicker';

export default class Home extends React.Component {

  render() {
    return (
      <AppStackNavigator />
    );
  }
}


const AppStackNavigator = StackNavigator({
  WelcomScreen: { screen: WelcomScreen },
  BarCodeScreen: { screen: BarCodeScreen },
  ExpiraitonDateScreen: { screen: ExpiraitonDateScreen },
  BarCodePicker: { screen: BarCodePicker },
  DatePicker: { screen: DatePicker }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
