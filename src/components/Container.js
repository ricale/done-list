import React, {Component} from 'react';
import {View} from 'react-native';

const Container = ({children, ...props}) => (
  <View {...props}>
    {children}
  </View>
);

Container.defaultProps = {
  style: {
    flex: 1,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    backgroundColor: 'white'
  }
};

export default Container;
