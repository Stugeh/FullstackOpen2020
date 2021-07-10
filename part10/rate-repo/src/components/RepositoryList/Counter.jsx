import React from 'react';
import {View} from 'react-native';
import Text, {Heading} from '../Text';

export const formatNumber = (number) => {
  if (number < 1000) return `${number}`;
  const thousands = number/1000;
  return `${Math.round(thousands * 10) / 10}k`;
}; 

const Counter = ({children, count}) => {
  return (
    <View testID='repoCardCounter'>
      <Heading style={{textAlign: 'center'}}>
        {formatNumber(count)}
      </Heading>
      <Text style={{textAlign: 'center'}}>{children}</Text>
    </View>
  );
};

export default Counter;