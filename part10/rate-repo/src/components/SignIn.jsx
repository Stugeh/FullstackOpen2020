import React from 'react';
import {View, Pressable} from 'react-native';
import Formik, {useField, TextInput} from 'formik';

import Text from './Text';

const initialValues = {
  username : '',
  password: '' 
};

const LoginForm = ({onSubmit}) => {
  // eslint-disable-next-line no-unused-vars
  const [usernameField, usernameMeta, usernameHelper] = useField('username');
  // eslint-disable-next-line no-unused-vars
  const [passwordField, passwordMeta, passwordHelper] = useField('password');
  return (
    <View>
      <TextInput
        placeholder='Username'
        value={usernameField.value}
        onChangeText={text => usernameHelper.setValue(text)}
      />
      <TextInput
        placeholder='Password'
        value={passwordField.value}
        onChangeText={text => passwordHelper.setValue(text)}
      />
      <Pressable onPress={onSubmit}>
        <Text>Log in</Text>
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
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <LoginForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;