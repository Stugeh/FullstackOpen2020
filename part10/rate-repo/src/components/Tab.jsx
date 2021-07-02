import React from 'react';
import {Pressable } from 'react-native';

import {Heading} from './Text';

const Tab = ({children, clickHandler}) => {
  return (
    <Pressable onPress={clickHandler}>
      <Heading color='textSecondary'>{children}</Heading>
    </Pressable>
  );
};

export default Tab;