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