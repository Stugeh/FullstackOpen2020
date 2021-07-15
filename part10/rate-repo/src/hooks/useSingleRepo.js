import {useQuery} from '@apollo/client';
import {GET_REPO_BY_ID} from '../graphql/queries';

const useSingleRepo = (id) => {
  const variables = {id};
  const {data, loading, error, fetchMore, refetch} = useQuery(
    GET_REPO_BY_ID,
    {   
      variables,
      fetchPolicy:'cache-and-network'
    }
  );
  
  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository?.reviews.pageInfo.hasNextPage;
    if (!canFetchMore) {
      return;
    }
    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables
      },
    });
  };
  
  return{
    repository: data ? data.repository : undefined,
    reviews: data ? data?.repository?.reviews : undefined,
    fetchMore: handleFetchMore,
    loading,
    refetch,
    error
  };
};

export default useSingleRepo;