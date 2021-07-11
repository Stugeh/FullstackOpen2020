import React from 'react';
import { ScrollView, StyleSheet} from 'react-native';
import Constants from 'expo-constants';
import {useQuery} from '@apollo/client';

import {IS_AUTHORIZED} from '../../graphql/queries';
import useSignIn from '../../hooks/useSignIn';
import theme from '../../theme';
import Tab from './Tab';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexShrink: 0,
    flexGrow: 0,
    width: '100%',
    paddingTop: Constants.statusBarHeight + 5,
    backgroundColor: theme.colors.appbar,
    paddingBottom: 15,
    paddingLeft: 10,
  },
  
});

const AppBar = () => {
  const {data} = useQuery(IS_AUTHORIZED);
  const {logout} = useSignIn();
  return(
    <ScrollView horizontal style={styles.container}>
      <Tab route='/'>Repositories</Tab>
      {data?.authorizedUser 
        ? <Tab route='/' callback={logout}>logout</Tab> 
        : <Tab route='/login'>Sign in</Tab>}
    </ScrollView>
  ); 
};

export default AppBar;