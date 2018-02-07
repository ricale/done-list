import React, {Component} from 'react';
import {View, Platform, TouchableOpacity, Text,} from 'react-native';''

export default class NavBar extends Component {
  static defaultProps = {
    style: {
      height: (Platform.OS === 'ios') ? 64 : 44,
      flexDirection: 'row',
      paddingTop: (Platform.OS === 'ios') ? 20 : 0,
      backgroundColor: 'white'
    },
    itemStyle: {
      flex: 1,
      justifyContent: 'center'
    }
  }

  render() {
    const {
      style,
      itemStyle,
      title,
      left,
      onPressLeft,
      onPressRight
    } = this.props;

    return (
      <View style={style}>
        <View style={itemStyle}>
          <TouchableOpacity
            onPress={onPressLeft}
            style={{paddingLeft: 10}}>
            <Text style={{color: '#017afe'}}>{left}</Text>
          </TouchableOpacity>
        </View>

        <View style={itemStyle}>
          <Text style={{width: '100%', textAlign: 'center'}}>{title}</Text>
        </View>

        <View style={[itemStyle, {flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}]}>
          {!!onPressRight &&
            <TouchableOpacity
              onPress={onPressRight}
              style={{paddingRight: 10}}>
              <Text style={{color: '#017afe'}}>Config</Text>
            </TouchableOpacity>
          }
        </View>
      </View>
    )
  }
}
