import React from 'react';
import Main from './src/components/Main';

import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client';

import { StyleSheet, View } from 'react-native';

import createApolloClient from './src/utils/apolloClient';

const apolloClient = createApolloClient();

export default function App() {
  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <View style={styles.container}>
          <Main/>
        </View>
      </ApolloProvider>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
  },
});
