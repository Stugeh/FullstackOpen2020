import { useEffect } from 'react';
import {useLazyQuery} from '@apollo/client';
import {GET_REPOSITORIES} from '../graphql/queries';

const SORTS = {
  latest:{
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC'
  },
  ratingHigh:{
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'DESC'
  },
  ratingLow:{
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'ASC'
  },
};

const useRepositories = (selectedSort) => {
  const [fetchRepositories, { loading, data, refetch }] = useLazyQuery(
    GET_REPOSITORIES,
    {fetchPolicy: 'cache-and-network'}
  );

  useEffect(() => {
    const sort = SORTS[selectedSort];
    fetchRepositories({
      variables: {
        orderBy: sort.orderBy,
        orderDirection: sort.orderDirection,
      }
    });
  }, [selectedSort]);

  return { 
    repositories: data ? data.repositories : undefined,
    loading,
    refetch
  };
};

export default useRepositories;