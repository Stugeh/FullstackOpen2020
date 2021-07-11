import React from 'react';
import {View, FlatList} from 'react-native';
import {useParams} from 'react-router-native';
import {useQuery} from '@apollo/client';

import theme from '../theme';

import { GET_REPO_BY_ID } from '../graphql/queries';
import {Heading} from '../components/Text';
import { RepositoryItemContainer } from './RepositoryList/RepositoryItem';

const ReviewItem = ({review}) => {
  console.log(`object`, review);
  const {text, rating, createdAt, user} = review;
  return (
    <View>
      <Heading>{user.username}</Heading>
    </View>
  );
};

const SingleRepo = () => {
  const {id} = useParams();
  const {data, loading, error} = useQuery(
    GET_REPO_BY_ID,
    {   
      variables: {id},
      fetchPolicy:'cache-and-network'
    }
  );
  console.log(`data`, Object.keys(data));
  const reviews = data?.repository?.reviews?.edges.map(edge => edge.node);
  console.log(`reviews`, reviews);
  if (loading) return <Heading>loading</Heading>;
  if(error) return <Heading>Error occurred</Heading>;
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() =>       
        <RepositoryItemContainer
          item={data.repository} singleRepoView />
      }
      ItemSeparatorComponent={() =>
        <View style={{
          backgroundColor: theme.colors.separator, height: 5}}/>
      }
    />

  );
};

export default SingleRepo;