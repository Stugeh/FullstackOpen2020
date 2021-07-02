import React from 'react';
import { View, StyleSheet} from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';

import Tab from './Tab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appbar,
    paddingBottom: 15,
    paddingLeft: 10,
  },
  
});

const AppBar = () => {
  return(
    <View style={styles.container}>
      <Tab clickHandler={()=> console.log('hi')}>Repositories</Tab>
    </View>
  ); 
};

export default AppBar;