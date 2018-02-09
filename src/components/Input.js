import React, {Component} from 'react';
import {TextInput} from 'react-native';

const Input = ({...args, style}) => (
  <TextInput
    {...args}
    underlineColorAndroid='rgba(0,0,0,0)'
    style={[{borderWidth: 1, padding: 5}, style]}
    />
);

export default Input;
