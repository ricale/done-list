import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';

import {Button, Icon} from 'components';

const IconButton = ({...args, style, iconName, color}) => (
  <Button {...args} style={[{padding: 10}, style]}>
    <Icon name={iconName} color={color} />
  </Button>
);

export default IconButton;
