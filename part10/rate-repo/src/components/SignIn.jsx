import React from 'react';
import {View,TextInput, Pressable} from 'react-native';
import {useField, Formik} from 'formik';

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
  button: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: theme.colors.primary,
  },
  buttonText:{
    justifyContent: 'space-around',
    color: '#FFFFFF',
    fontWeight: 'bold',
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
};

const LoginForm = ({onSubmit}) => {
  // eslint-disable-next-line no-unused-vars
  const [usernameField, usernameMeta, usernameHelper] = useField('username');
  // eslint-disable-next-line no-unused-vars
  const [passwordField, passwordMeta, passwordHelper] = useField('password');
  return (
    <View style={styles.form}>
      <TextInput
        style={styles.field}
        placeholder='Username'
        value={usernameField.value}
        onChangeText={text => usernameHelper.setValue(text)}
      />
      <TextInput
        style={styles.field}
        placeholder='Password'
        value={passwordField.value}
        onChangeText={text => passwordHelper.setValue(text)}
      />
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Log in</Text>
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