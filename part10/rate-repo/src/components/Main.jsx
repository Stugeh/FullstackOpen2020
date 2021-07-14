import React from 'react';

import { StyleSheet, View } from 'react-native';
import {Route, Switch, Redirect} from 'react-router-native';

import theme from '../theme';

import AppBar from './Appbar';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import SingleRepo from './SingleRepo';
import ReviewForm from './ReviewForm';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    flexShrink: 0,
    backgroundColor: theme.colors.separator
  },
});

const Main = () => {
  console.log('****RUNNING****');
  return (
    <View style={styles.container}>
      <AppBar/>
      <Switch>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Route path="/login">
          <SignIn/>
        </Route>
        <Route path="/review-form">
          <ReviewForm/>
        </Route>
        <Route path="/:id">
          <SingleRepo/>
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;