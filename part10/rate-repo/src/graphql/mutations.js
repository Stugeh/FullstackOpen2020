import {gql} from '@apollo/client';

const SIGN_IN = gql`
    mutation login($username: String!, $password: String!){
        authorize(
            credentials: {
                username: $username,
                password: $password 
            }
        ){accessToken}
    }
`;

export const POST_REVIEW = gql`
    mutation review($review: CreateReviewInput!) {
        createReview(review: $review){repositoryId}
  }
`;

export const SIGN_UP = gql`
mutation signUp($user: CreateUserInput!){
    createUser(user: $user){
      id
      username
    }
  }
`;

export default SIGN_IN;