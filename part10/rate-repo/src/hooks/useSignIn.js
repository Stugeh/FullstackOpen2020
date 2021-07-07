import { useMutation } from "@apollo/client";
import SIGN_IN from '../graphql/mutations';

const useSignIn = () => {
  const [login, result] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    login({variables: {username, password}});
    if(result.data) return result.data.authorize.accessToken; 
    return undefined;
  };
  return [signIn, result.data];
};

export default useSignIn;