import React from 'react';
import {View} from 'react-native';
import {useParams} from 'react-router-native';

const SingleRepo = () => {
  const {id} = useParams();
  console.log(`id`, id);
  return (
    <View>
            
    </View>
  );
};

export default SingleRepo;