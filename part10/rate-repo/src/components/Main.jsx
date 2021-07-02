import React from 'react';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import {Route, Switch, Redirect} from 'react-router-native';

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
      <Switch>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;