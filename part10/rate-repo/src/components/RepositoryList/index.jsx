import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import theme from '../../theme';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../../hooks/useRepositories';


const styles = StyleSheet.create({
  separator: {
    height: 5,
    backgroundColor: theme.colors.separator
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({repositories}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => <RepositoryItem item={item}/>}
      keyExtractor={repo => repo.id}
      contentContainerStyle={{ paddingBottom: 75 }}
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();
  return <RepositoryListContainer repositories={repositories}/>;
};

export default RepositoryList;