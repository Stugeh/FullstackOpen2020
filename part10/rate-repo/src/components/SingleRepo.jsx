import React from 'react';
import {View, FlatList} from 'react-native';
import {useParams} from 'react-router-native';
import {useQuery} from '@apollo/client';

import { GET_REPO_BY_ID } from '../graphql/queries';
import {Heading} from '../components/Text';
import { RepositoryItemContainer } from './RepositoryList/RepositoryItem';

const ReviewItem = ({review}) => {
  const {text, rating, createdAt, user} = review;
  return (
    <View>
      
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
  const reviews = data?.reviews?.edges.map(edge => edge.node);
  
  if (loading) return <Heading>loading</Heading>;
  if(error) return <Heading>Error occurred</Heading>;
  
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() =>       
        <RepositoryItemContainer 
          item={data.repository}
          singleRepoView
        />
      }
    />

  );
};

export default SingleRepo;