import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {useParams} from 'react-router-native';
import {format} from 'date-fns';

import theme from '../theme';

import useSingleRepo from '../hooks/useSingleRepo';
import Text, {Heading} from '../components/Text';
import { RepositoryItemContainer } from './RepositoryList/RepositoryItem';

const styles = StyleSheet.create({
  reviewContainer:{
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
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
  }
});

const ReviewItem = ({review}) => {
  const {text, rating, createdAt, user} = review;
  return (
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