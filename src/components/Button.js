import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';

const Button = ({...args, children}) => (
  <TouchableOpacity {...args}>
    {children}
  </TouchableOpacity>
);

export default Button;
