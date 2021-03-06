import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, TouchableOpacity, Alert} from 'react-native';

import {Container, Button, Text} from 'components';
import {clearAll} from 'actions/days';
import {Storage} from 'utils';

class Setting extends Component {
  static defaultProps = {
    clearButtonStyle: {
      backgroundColor: 'red',
      padding: 10,
      margin: 1
    }
  };

  handlePressClear = () => {
    this.props.clearAll();
    Alert.alert(
      '초기화가 완료되었습니다.',
      '',
      [{text: '확인'},],
      {cancelable: false}
    );
  }

  render() {
    const {clearButtonStyle} = this.props;
    return (
      <Container>
        <Button onPress={this.handlePressClear} style={clearButtonStyle}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>초기화</Text>
        </Button>
      </Container>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return ownProps;
}

function mapDispatchToProps(dispatch) {
  return {
    clearAll: (...args) =>
      dispatch(clearAll(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
