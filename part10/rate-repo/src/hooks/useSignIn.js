import { useMutation, useApolloClient } from "@apollo/client";
import SIGN_IN from '../graphql/mutations';

import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [login, {data}] = useMutation(SIGN_IN);
  const accessToken = data?.authorize 
    ? data.authorize.accessToken 
    : undefined;
  
  const signIn = async ({ username, password }) => {
    await login({variables: {username, password}});
    if(accessToken){
      await authStorage.setAccessToken(accessToken);
      apolloClient.resetStore();
    }
    return accessToken;
  };
  return [signIn, accessToken];
};

export default useSignIn;