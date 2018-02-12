import React, {Component} from 'react';
import {TouchableOpacity, Text} from 'react-native';

import Button from 'components/Button';

const TextButton = ({...args, style, text, color = '#FFF'}) => {
  const defaultStyle = {
    padding: 10
  };

  const backgroundColor = args.disabled ? ((style || {}).disabledBackgroundColor || 'lightgray') :
                                          ((style || {}).backgroundColor         || '#007bff');

  return (
    <Button {...args} style={[defaultStyle, style, {backgroundColor}]}>
      <Text style={{textAlign: 'center', color, fontWeight: 'bold'}}>{text}</Text>
    </Button>
  );
};

export default TextButton;
