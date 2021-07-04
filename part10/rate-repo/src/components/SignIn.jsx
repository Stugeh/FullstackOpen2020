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
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <LoginForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;