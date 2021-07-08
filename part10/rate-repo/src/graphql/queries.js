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

export const IS_AUTHORIZED = gql`
    query{
        authorizedUser {
            id
            username
        }
    }
`;