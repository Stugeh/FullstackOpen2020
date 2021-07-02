import React from 'react';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.separator
  },
});

const Main = () => {
  console.log('****RUNNING****');
  return (
    <View style={styles.container}>
      <AppBar/>
      <RepositoryList/>
    </View>
  );
};

export default Main;