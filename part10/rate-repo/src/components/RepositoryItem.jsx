import React from 'react';
import {View,Image , StyleSheet} from 'react-native';
import Text, {Heading} from './Text'; 
import Counter from './Counter';
import theme from '../theme';

const styles = StyleSheet.create({
  card: {
    flex:1,
    padding: 10,
    borderWidth: 1,
    width:'100%',
    backgroundColor: '#ffffff'
  },
  header:{
    flex: 1,
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
});

const RepositoryItem = ({item}) => {
  return (
    <View style={styles.card}>
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
      <View style={styles.footer}>
        <Counter count={item.stargazersCount}>Stars</Counter>
        <Counter count={item.forksCount}>Forks</Counter>
        <Counter count={item.reviewCount}>Reviews</Counter>
        <Counter count={item.ratingAverage}>Rating</Counter>
      </View>
    </View>
  );
};

export default RepositoryItem;