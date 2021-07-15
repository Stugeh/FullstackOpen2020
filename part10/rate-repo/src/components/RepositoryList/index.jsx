import React, {useState} from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker';

import theme from '../../theme';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../../hooks/useRepositories';
import { Heading } from '../Text';


const styles = StyleSheet.create({
  picker: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: theme.colors.appbar
  },
  separator: {
    height: 5,
    backgroundColor: theme.colors.separator
  },
});

const RepoListHeader = ({props}) => {
  const {selectedSort, setSelectedSort} = props;
  return(
    <View>
      <View style={styles.picker}>
        <Picker
          selectedValue={selectedSort}
          onValueChange={(itemValue)=> setSelectedSort(itemValue)}
          prompt='Sort by'
        >
          <Picker.Item label='Latest' value='latest'/>
          <Picker.Item label='Highest Rated' value='ratingHigh'/>
          <Picker.Item label='Lowest Rated' value='ratingLow'/>
        </Picker>
      </View>
      <ItemSeparator/>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({repositories, ...props}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      ListHeaderComponent={<RepoListHeader props={props}/>}
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
      <RepositoryListContainer 
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
        repositories={repositories}
      />
    </View>
  );
};

export default RepositoryList;