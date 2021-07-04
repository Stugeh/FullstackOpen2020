import React from 'react';
import {View, Pressable} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import Text from './Text';

const initialValues = {
  username : '',
  password: '' 
};

const styles = {
  container: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    margin: 30,
    elevation: 50,
  },
  form:{
    width:200,
    padding: 10,
  },
};

const LoginForm = ({onSubmit}) => {
  return (
    <View style={styles.form}>
      <FormikTextInput
        style={styles.field}
        placeholder='Username'
        name='username'
      />
      <FormikTextInput
        style={styles.field}
        placeholder='Password'
        name='password'
        secureTextEntry
      />
      <Pressable onPress={onSubmit} style={theme.button}>
        <Text style={theme.buttonText}>Log in</Text>
      </Pressable>
    </View>
  );
};

const validationSchema = yup.object().shape({
  username: yup.string().required('username is required'),
  password: yup.string().required('password is required'),
});

const SignIn = () => {
  const onSubmit = values => {
    // const username = values.username;
    // const password = values.password;
    // if(![username, password].includes('')){
    //   console.log(`${username} logging in`);
    // }
    console.log("login: ", values);
  };
  return (
    <View style={styles.container}>
      <Formik  
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => <LoginForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default SignIn;