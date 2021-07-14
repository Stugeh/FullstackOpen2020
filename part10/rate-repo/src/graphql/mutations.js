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

export default SIGN_IN;