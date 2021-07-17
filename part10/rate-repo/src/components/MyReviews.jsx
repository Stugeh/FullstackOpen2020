import React from 'react';
import {View, FlatList} from 'react-native';
import {useQuery} from '@apollo/client';

import { IS_AUTHORIZED } from '../graphql/queries';
import {ReviewItem} from './SingleRepo'; 
import theme from '../theme';

const styles = {
  separator: {
    height: 5,
    backgroundColor: theme.colors.separator
  }
};

const MyReviews = () => {
  const {data} = useQuery(IS_AUTHORIZED,{
    fetchPolicy: 'cache-and-network',
    variables:{
      includeReviews: true
    },
  });
  const reviews = data?.authorizedUser?.reviews?.edges.map(edge => edge.node);
  
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} showButtons/>}
      ItemSeparatorComponent={()=><View style={styles.separator}/>}
      keyExtractor={({ id }) => id}
    />
  );
};

export default MyReviews;