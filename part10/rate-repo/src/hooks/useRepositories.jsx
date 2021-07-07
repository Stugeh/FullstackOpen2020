import { useEffect } from 'react';
import {useLazyQuery} from '@apollo/client';
import {GET_REPOSITORIES} from '../graphql/queries';

const useRepositories = () => {
  const [fetchRepositories, { loading, data, refetch }] = useLazyQuery(
    GET_REPOSITORIES,
    {fetchPolicy: 'cache-and-network'}
  );

  useEffect(() => {
    fetchRepositories();
  }, []);

  return { 
    repositories: data ? data.repositories : undefined,
    loading,
    refetch
  };
};

export default useRepositories;