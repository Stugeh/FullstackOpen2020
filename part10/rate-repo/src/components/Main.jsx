import React from 'react';
import { StyleSheet, View } from 'react-native';
import {Route, Switch, Redirect} from 'react-router-native';

import theme from '../theme';

import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    flexShrink: 1,
    backgroundColor: theme.colors.separator
  },
  views: {
    flexShrink: 0,
  }
});

const Main = () => {
  console.log('****RUNNING****');
  return (
    <View style={styles.container}>
      <AppBar/>
      <View style={styles.views}>
        <Switch>
          <Route path="/" exact>
            <RepositoryList />
          </Route>
          <Route path="/login">
            <SignIn/>
          </Route>
          <Redirect to="/" />
        </Switch>
      </View>
    </View>
  );
};

export default Main;