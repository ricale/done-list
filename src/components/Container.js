import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';

const Container = ({children, scroll, ...props}) => (
  scroll ?
    <ScrollView {...props}>
      {children}
    </ScrollView> :
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
