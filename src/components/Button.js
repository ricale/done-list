import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';

const IconButton = ({...args, children}) => (
  <TouchableOpacity {...args}>
    {children}
  </TouchableOpacity>
);

export default IconButton;
