import {gql} from '@apollo/client';

export const SIGN_IN = gql`
    mutation {
        authorize(
            credentials: {
                username: "kalle",
                password: "password" 
            }
        ){accessToken}
    }
`;