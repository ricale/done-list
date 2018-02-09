import React, {Component} from 'react';
import {TouchableOpacity, Text} from 'react-native';

import Button from 'components/Button';

const TextButton = ({...args, style, text, color = '#FFF'}) => (
  <Button {...args} style={[{padding: 10, backgroundColor: '#007bff'}, style]}>
    <Text style={{textAlign: 'center', color, fontWeight: 'bold'}}>{text}</Text>
  </Button>
);

export default TextButton;
