import React from 'react';
import { TextInput as NativeTextInput} from 'react-native';

import theme from '../../theme';


const TextInput = ({ style, error, ...props }) => {
  const fieldStyle = [
    theme.textField,
    style,
    error && {borderColor: 'red'},
  ];
  return <NativeTextInput style={fieldStyle} {...props} />;
};

export default TextInput;