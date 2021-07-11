import {gql} from '@apollo/client';

export const GET_REPOSITORIES = gql`
    query {
        repositories {
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
            }
        }
    }
`;

export const GET_REPO_URL = gql`
    query getRepoUrl($id: String!) {
        repository(id: $id){
            id
            url
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