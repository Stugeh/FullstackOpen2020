import React from 'react';
import {View,Image , StyleSheet, Pressable} from 'react-native';
import {useHistory} from 'react-router-native';

import Text, {Heading} from '../Text'; 
import Counter from './Counter';
import theme from '../../theme';

const styles = StyleSheet.create({
  card: {
    padding: 10,
    flexDirection: 'column',
    borderWidth: 1,
    backgroundColor: '#ffffff'
  },
  header:{
    flexDirection: 'row',
  },
  details:{
    flexDirection: 'column',
    flexShrink: 1,
    width: '100%', 
  },
  language:{
    backgroundColor: theme.colors.primary,
    color: theme.colors.textSecondary,
    flexShrink: 1,
    alignSelf: 'flex-start',
    padding: 2,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 3,
  },
  thumbnail:{
    marginRight:3, 
    width:70,
    height:70,
    alignSelf: 'center',
    flexGrow: 1,
  },
  footer:{
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  bigButton:{
    backgroundColor: theme.colors.primary,
    color: theme.colors.textSecondary,
    alignSelf: 'stretch',
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
  }

});

export const RepositoryItemContainer = ({
  item,
  singleRepoView=false,
  pressHandler=()=>{},
}) => {
  const {
    id,
    stargazersCount,
    forksCount,
    reviewCount,
    ratingAverage } = item;

  return (
    <View testID='repoCard' style={styles.card}>
      <Pressable onPress={() => pressHandler(id)}>
        <View style={styles.header}>
          <Image 
            style={styles.thumbnail} 
            source={{uri: item.ownerAvatarUrl}}
          />
          <View style={styles.details}>
            <Heading>{item.fullName}</Heading>
            <Text>{item.description}</Text>
            <Text style={styles.language}>{item.language}</Text>
          </View>
        </View>
        <View testID='repoCardCounters' style={styles.footer}>
          <Counter count={stargazersCount}>Stars</Counter>
          <Counter count={forksCount}>Forks</Counter>
          <Counter count={reviewCount}>Reviews</Counter>
          <Counter count={ratingAverage}>Rating</Counter>
        </View>
        {singleRepoView ? (
          <View style={styles.bigButton} hidden>
            <Heading 
              color='textSecondary'
              style={{alignSelf: 'center'}}
            >
            Github
            </Heading>
          </View>
        ): null }
      </Pressable>
    </View>);
};

const RepositoryItem = ({item}) => {
  const history = useHistory();
  const openRepoView = (id) => {
    history.push(`/${id}`);
  };

  return (
    <RepositoryItemContainer item={item} pressHandler={openRepoView}/>
  );
};

export default RepositoryItem;