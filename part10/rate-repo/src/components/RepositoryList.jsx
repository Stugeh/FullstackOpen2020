import React, {useState, useEffect} from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import theme from '../theme';
import RepositoryItem from './RepositoryItem';


const styles = StyleSheet.create({
  separator: {
    height: 5,
    backgroundColor: theme.colors.separator
  },
  list: {
    marginBottom: 80,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [repositories, setRepositories] = useState([]);

  const fetchRepositories = async () => {
    const res = await fetch('http://192.168.1.5:5000/api/repositories');
    const json = await res.json();
    setRepositories(json);
  };

  useEffect(()=>{
    fetchRepositories();
  },[]);

  const repositoryNodes = repositories.edges
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={RepositoryItem}
      keyExtractor={repo => repo.id}
      style={styles.list}
    />
  );
};

export default RepositoryList;