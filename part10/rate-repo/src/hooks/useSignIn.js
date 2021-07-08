import { useMutation } from "@apollo/client";
import SIGN_IN from '../graphql/mutations';
import apolloClient from '../utils/apolloClient';

import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const [login, result] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    await login({variables: {username, password}});
    const {accessToken} = result.data.authorize;
    if(accessToken){
      await authStorage.setAccessToken(accessToken);
      apolloClient.resetStore();
      return authStorage.getAccessToken(); 
    }
    return undefined;
  };
  return [signIn, result.data];
};

export default useSignIn;