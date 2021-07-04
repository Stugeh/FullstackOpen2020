import React from 'react';
import {View, Pressable} from 'react-native';
import {Formik} from 'formik';
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
  },
  form:{
    width:200,
    padding: 10,
  },
  field:{
    padding: 5,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: theme.separator,
    marginBottom: 3
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
      />
      <Pressable onPress={onSubmit} style={theme.button}>
        <Text style={theme.buttonText}>Log in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = values => {
    const username = values.username;
    const password = values.password;
    if(![username, password].includes('')){
      console.log(`${username} logging in`);
    }
  };
  return (
    <View style={styles.container}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ handleSubmit }) => <LoginForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default SignIn;