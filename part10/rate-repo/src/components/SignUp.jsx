import React from 'react';
import {View} from 'react-native';
import {Formik} from 'formik';
import {useMutation} from '@apollo/client';
import {useHistory} from 'react-router-native';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import { Heading } from './Text';
import { SIGN_UP } from '../graphql/mutations';

import theme from '../theme';

const styles = {
  container: {
    backgroundColor: '#FFFFFF',
    flexGrow: 1,
  },
  form:{
    paddingHorizontal: 30,
  },
  field:{
    fontSize: theme.fontSizes.subHeading,
    padding: 10,
    marginBottom: 10,
  },
};

const SignUpContainer = (onSubmit) => {
  const validationSchema = yup.object().shape({
    username: yup.string().min(1).max(30).required('Username is required'),
    password: yup.string().min(5).max(50).required('Password is required'),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password'), null])
      .required('Password confirmation is required'),
  });
  const initialValues = {
    username: '',
    password: '',
    passwordConfirmation: '',
  };
  return (
    <View style={styles.container}>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
            
      </Formik>
 
    </View>
  );  
};

const SignUp = () => {
  const [postUser, {data}] = useMutation(SIGN_UP); 
  const history = useHistory();
  const createUser = async ({username, password}) => {
    try{
      await postUser({variables:{username, password}});
      history.push('/login');
    }catch(err){
      console.log(`ERROR: `, err);
    }
  };

  return (
    <View>
      <Heading>sign up</Heading>
      <SignUpContainer onSubmit={createUser}/>
    </View>
  );
};

export default SignUp;