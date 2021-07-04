import React from 'react';
import {View} from 'react-native';
import Formik from 'formik';

import Text from './Text';

const LoginForm = () => {
  return (
    <View>

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