import React from 'react';
import {useParams} from 'react-router-native';
import {useQuery} from '@apollo/client';

import { GET_REPO_BY_ID } from '../graphql/queries';
import {Heading} from '../components/Text';
import { RepositoryItemContainer } from './RepositoryList/RepositoryItem';

const SingleRepo = () => {
  const {id} = useParams();
  const {data, loading, error} = useQuery(
    GET_REPO_BY_ID,
    {   
      variables: {id},
      fetchPolicy:'cache-and-network'
    }
  );

  if(error) return <Heading>Error occurred</Heading>;
  if (loading) return <Heading>loading</Heading>;

  return (
    <RepositoryItemContainer 
      item={data.repository}
      singleRepoView
    />
  );
};

export default SingleRepo;