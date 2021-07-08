import React from 'react';
import {View} from 'react-native';
import Text, {Heading} from './Text';

const numberToThousands = (number) => {
  const thousands = number/1000;
  return `${Math.round(thousands * 10) / 10}k`;
}; 

const Counter = ({children, count}) => {
  return (
    <View testID='repoCardCounter'>
      <Heading style={{textAlign: 'center'}}>
        {count > 1000 ? numberToThousands(count) : count}
      </Heading>
      <Text style={{textAlign: 'center'}}>{children}</Text>
    </View>
  );
};

export default Counter;