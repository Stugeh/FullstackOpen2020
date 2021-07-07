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

export default SIGN_IN;