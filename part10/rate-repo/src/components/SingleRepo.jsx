import React from 'react';
import {View, FlatList, StyleSheet, Pressable} from 'react-native';
import {useParams, useHistory} from 'react-router-native';
import {format} from 'date-fns';

import theme from '../theme';

import useSingleRepo from '../hooks/useSingleRepo';
import Text, {Heading} from '../components/Text';
import { RepositoryItemContainer } from './RepositoryList/RepositoryItem';

const styles = StyleSheet.create({
  card:{
    backgroundColor: 'white',
    padding: 10,
  },
  reviewContainer:{
    flex: 1,
    flexDirection: 'row',
  },
  rating:{
    height: 50,
    width: 50,
    lineHeight: 50,
    textAlign: 'center',
    marginRight:5,
    borderRadius: 30,
    borderWidth:3,
    borderColor: theme.colors.primary,
    color: theme.colors.primary,
  },
  body:{
    flexGrow: 1,
    flexShrink: 1,
  },
  separator: {
    height: 5,
    backgroundColor: theme.colors.separator
  },
  cardButtons:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop:10,
  },
  viewRepo:{
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 10
  },
  deleteReview:{
    backgroundColor: theme.colors.danger,
    padding:10,
    borderRadius: 10
  },
});

export const ReviewItem = ({review, showButtons=true}) => {
  const {text, rating, createdAt, user} = review;
  const history = useHistory('');
  
  const deleteReview = () => {
    console.log('delete');
  };

  return (
    <View style={styles.card}>
      <View style={styles.reviewContainer}>
        <Heading style={styles.rating}>
          {rating}
        </Heading>
        <View style={styles.body}>
          <Heading>{user.username}</Heading>
          <Text>{format(new Date(createdAt), 'dd/mm/yyyy')}</Text>
          <Text>{text}</Text>
        </View>
      </View>
      {showButtons 
        ? (
          <View style={styles.cardButtons}>
            <Pressable style={styles.viewRepo} onPress={()=>{
              history.push(`/${review.repositoryId}`);
            }}>
              <Heading style={{color:'white'}}>View repository</Heading>
            </Pressable>
            <Pressable style={styles.deleteReview} onPress={deleteReview}>
              <Heading style={{color:'white'}}>Delete review</Heading>
            </Pressable>
          </View>
        ) : null
      }
    </View>
  );
};
const Separator = () => (<View style={styles.separator}/>);

const SingleRepo = () => {
  const {id} = useParams();
  const {repository, reviews, fetchMore} = useSingleRepo(id);

  const cleanReviews = reviews?.edges.map(edge => edge.node);
  return (
    <FlatList
      data={cleanReviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={Separator}
      ListHeaderComponent={() => (
        <View> 
          <RepositoryItemContainer
            item={repository} singleRepoView />
          <Separator/>
        </View>
      )}
      onEndReached={fetchMore}
      onEndReachedThreshold={0.1}
    />

  );
};

export default SingleRepo;