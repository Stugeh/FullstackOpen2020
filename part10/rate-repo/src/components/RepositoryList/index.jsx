import React, {useState} from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker';

import theme from '../../theme';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../../hooks/useRepositories';


const styles = StyleSheet.create({
  picker: {
    backgroundColor: '#FFFFFF'
  },
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
      contentContainerStyle={{ paddingBottom: 140 }}
    />
  );
};

const RepositoryList = () => {
  const [selectedSort, setSelectedSort] = useState('latest');
  const { repositories } = useRepositories(selectedSort);
  return (
    <View style={styles.container}>
      <Picker
        style={styles.picker}
        selectedValue={selectedSort}
        onValueChange={(itemValue)=> setSelectedSort(itemValue)}
      >
        <Picker.Item label='Latest' value='latest'/>
        <Picker.Item label='Highest Rated' value='ratingHigh'/>
        <Picker.Item label='Lowest Rated' value='ratingLow'/>
      </Picker>
      <RepositoryListContainer repositories={repositories}/>
    </View>
  );
};

export default RepositoryList;