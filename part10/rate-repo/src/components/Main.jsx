import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import Text, {Heading} from './Text';


const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
    padding: 5
  },
  header: {
    fontSize: 20,
    paddingBottom: 20,
    fontWeight: "bold"
  }
});

const Main = () => {
  console.log('****RUNNING****');
  return (
    <View style={styles.container}>
      <Heading>Rate Repository Application</Heading>
      <RepositoryList/>
    </View>
  );
};

export default Main;