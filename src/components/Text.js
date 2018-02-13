import React, {Component} from 'react';
import {Text} from 'react-native';

const CustomText = ({...args, style}) => (
  <Text {...args} style={[style]}></Text>
);

export default CustomText;
