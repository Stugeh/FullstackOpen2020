import React from 'react';
import {Link} from 'react-router-native';
import {Pressable, StyleSheet} from 'react-native';
import {Heading} from './Text';

const styles = StyleSheet.create({
  link:{
    paddingRight: 15,
  }
});

const Tab = ({children, route}) => {
  return (
    <Pressable style={styles.link}>
      <Link to={route}>
        <Heading color='textSecondary'>
          {children}
        </Heading>
      </Link>
    </Pressable>
  );
};

export default Tab;