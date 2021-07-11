import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {useParams} from 'react-router-native';
import {useQuery} from '@apollo/client';
import {format} from 'date-fns';

import theme from '../theme';

import { GET_REPO_BY_ID } from '../graphql/queries';
import Text, {Heading} from '../components/Text';
import { RepositoryItemContainer } from './RepositoryList/RepositoryItem';

const styles = StyleSheet.create({
  reviewContainer:{
    flex:1,
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
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
    flexShrink:1,
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
  const {data, loading, error} = useQuery(
    GET_REPO_BY_ID,
    {   
      variables: {id},
      fetchPolicy:'cache-and-network'
    }
  );


  const reviews = data?.repository?.reviews?.edges.map(edge => edge.node);

  if (loading) return <Heading>loading</Heading>;
  if(error) return <Heading>Error occurred</Heading>;
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={Separator}
      ListHeaderComponent={() => (
        <View> 
          <RepositoryItemContainer
            item={data.repository} singleRepoView />
          <Separator/>
        </View>
      )
      }
    />

  );
};

export default SingleRepo;