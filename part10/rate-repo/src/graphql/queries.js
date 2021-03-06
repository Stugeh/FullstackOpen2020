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
      first: 8
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
    query getRepo($id: ID! $after: String) {
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
            reviews (first: 4 after: $after){
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
                  cursor
                }
                pageInfo{
                  endCursor
                  startCursor
                  hasNextPage
                }
              }
        }
    }
`;

export const IS_AUTHORIZED = gql`
    query getAuthorizedUser($includeReviews: Boolean = false){
        authorizedUser {
            id
            username
            reviews @include(if: $includeReviews){
              edges{
                node{
                  id
                  text
                  rating
                  createdAt
                  user {
                    id
                    username
                  }
                  repositoryId           
                }
                cursor
              }
              pageInfo {
                endCursor
                startCursor
                hasNextPage
              }
            }
        }
    }
`;