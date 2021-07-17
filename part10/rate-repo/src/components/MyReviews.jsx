import React from 'react';
import {View} from 'react-native';
import {useQuery} from '@apollo/client';

import { IS_AUTHORIZED } from '../graphql/queries';
import {ReviewItem} from './SingleRepo'; 

const MyReviews = () => {
  const {data} = useQuery(IS_AUTHORIZED,{
    fetchPolicy: 'cache-and-network',
    variables:{
      includeReviews: true
    },
  });
  console.log(data);
  return (
    <View>
            
    </View>
  );
};

export default MyReviews;