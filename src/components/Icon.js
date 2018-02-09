import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

class MyIcon extends Component {
  static defaultProps = {
    size: 20
  };

  render() {
    return (
      <Icon {...this.props} />
    );
  }
}

export default MyIcon