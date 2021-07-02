import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';

import theme from '../theme';
import {Heading} from './Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.primary,
    padding: 5
  },
  
});

const AppBar = () => {
  return(
    <View style={styles.container}>
      <Pressable onPress={() => console.log(`hi`)}>
        <Heading color='textSecondary'>Repositories</Heading>
      </Pressable>
    </View>
  ); 
};

export default AppBar;