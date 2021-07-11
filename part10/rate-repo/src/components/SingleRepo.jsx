import React from 'react';
import {View} from 'react-native';
import {useParams} from 'react-router-native';
import {useQuery} from '@apollo/client';

import { GET_REPO_URL } from '../graphql/queries';

const SingleRepo = () => {
  const {id} = useParams();
  const [getRepoUrl, {data, loading, error}] = useQuery(GET_REPO_URL);
  console.log(`id`, id);

  return (
    <View>
            
    </View>
  );
};

export default SingleRepo;