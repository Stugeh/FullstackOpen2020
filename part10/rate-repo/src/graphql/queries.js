import {gql} from '@apollo/client';

export const GET_REPOSITORIES = gql`
query fetchRepositories(
    $orderDirection: OrderDirection
    $orderBy: AllRepositoriesOrderBy
    $search: String
    $after: String
  ) {
    repositories(
      searchKeyword: $search
      orderDirection: $orderDirection
      orderBy: $orderBy
      after: $after
      first: 5
    ) {
      edges {
        node {
          id
          fullName
          stargazersCount
          language
          description
          ownerAvatarUrl
          forksCount
          ratingAverage
          reviewCount
        }
        cursor
      }
      pageInfo{
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
`;

export const GET_REPO_BY_ID = gql`
    query getRepo($id: ID!) {
        repository(id: $id){
            id
            fullName
            stargazersCount
            language
            description
            ownerAvatarUrl
            forksCount
            ratingAverage
            reviewCount
            url
            reviews {
                edges {
                  node {
                    id
                    text
                    rating
                    createdAt
                    user {
                      id
                      username
                    }
                  }
                }
              }
        }
    }
`;

export const IS_AUTHORIZED = gql`
    query{
        authorizedUser {
            id
            username
        }
    }
`;