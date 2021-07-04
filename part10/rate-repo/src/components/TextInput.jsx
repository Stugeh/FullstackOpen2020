import React from 'react';
import { TextInput as NativeTextInput} from 'react-native';

import theme from '../theme';

// eslint-disable-next-line no-unused-vars
const TextInput = ({ style, error, ...props }) => {
  return <NativeTextInput style={theme.textField} {...props} />;
};

export default TextInput;