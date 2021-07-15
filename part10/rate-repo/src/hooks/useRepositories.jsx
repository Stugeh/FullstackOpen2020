import { useEffect } from 'react';
import {useQuery} from '@apollo/client';
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

const useRepositories = (selectedSort, search) => {
  const sort = SORTS[selectedSort];
  const variables = {
    orderBy: sort.orderBy,
    orderDirection: sort.orderDirection,
    search
  };
  const { loading, data, refetch, fetchMore } = useQuery(
    GET_REPOSITORIES,
    {
      fetchPolicy: 'cache-and-network', 
      variables
    }
  );


  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
    if (!canFetchMore) {
      return;
    }
    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return { 
    repositories: data ? data.repositories : undefined,
    fetchMore: handleFetchMore,
    loading,
    refetch
  };
};

export default useRepositories;