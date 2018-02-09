import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';

import Button from 'components/Button';
import Icon from 'components/Icon';

const IconButton = ({...args, style, iconName, color}) => (
  <Button {...args} style={[{padding: 10}, style]}>
    <Icon name={iconName} color={color} />
  </Button>
);

export default IconButton;
