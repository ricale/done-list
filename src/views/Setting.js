import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import Container from 'components/Container';
import Storage from 'utils/Storage';

export default class Setting extends Component {
  static defaultProps = {
    clearButtonStyle: {
      backgroundColor: 'red',
      padding: 10,
      margin: 1
    }
  };

  handlePressClear = () => {
    Storage.clear()
  }

  render() {
    const {clearButtonStyle} = this.props;
    return (
      <Container>
        <TouchableOpacity onPress={this.handlePressClear} style={clearButtonStyle}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>초기화</Text>
        </TouchableOpacity>
      </Container>
    );
  }
}
