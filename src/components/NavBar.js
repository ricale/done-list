import React, {Component} from 'react';
import {View, Platform, TouchableOpacity, Text,} from 'react-native';''

export default class NavBar extends Component {
  static defaultProps = {
    style: {
      height: (Platform.OS === 'ios') ? 64 : 54,
      flexDirection: 'row',
      paddingTop: 20,
      backgroundColor: 'white'
    },
    itemStyle: {
      flex: 1,
      justifyContent: 'center'
    }
  }

  render() {
    const {style, itemStyle, title, left, onPressLeft} = this.props;

    return (
      <View style={style}>
        <TouchableOpacity
          onPress={onPressLeft}
          style={[itemStyle, {paddingLeft: 10}]}>
          <Text style={{color: '#017afe'}}>{left}</Text>
        </TouchableOpacity>

        <View style={itemStyle}>
          <Text style={{width: '100%', textAlign: 'center'}}>{title}</Text>
        </View>

        <View style={[itemStyle, {flexDirection: 'row', justifyContent: 'flex-end'}]}>
        </View>
      </View>
    )
  }
}
