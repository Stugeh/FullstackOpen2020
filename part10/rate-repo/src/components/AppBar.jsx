import React from 'react';
import { ScrollView, StyleSheet} from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';

import Tab from './Tab';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexShrink: 0,
    flexGrow: 0,
    paddingTop: Constants.statusBarHeight + 5,
    backgroundColor: theme.colors.appbar,
    paddingBottom: 15,
    paddingLeft: 10,
  },
  
});

const AppBar = () => {
  return(
    <ScrollView horizontal style={styles.container}>
      <Tab route='/'>Repositories</Tab>
      <Tab route='/login'>Sign in</Tab>
    </ScrollView>
  ); 
};

export default AppBar;