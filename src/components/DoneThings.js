import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {colors as defaultColors} from 'constants/colors';

class DoneThings extends Component {
  static defaultProps = {
    removeButton: false,

    style: {
      alignItems: 'flex-start'
    },
    thingStyle: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    nameStyle: {
      padding: 3,
      marginBottom: 2,
    },
    removeButtonStyle: {
      marginLeft: 4,
      paddingLeft: 4,
      paddingRight: 4
    }
  };

  getThingNameStyle(thing) {
    const {allThings, fontSize, nameStyle} = this.props;
    const backgroundColor = (thing || {}).color || defaultColors[Object.keys(allThings).indexOf(thing)];
    return {
      ...nameStyle,
      fontSize,
      backgroundColor
    };
  }

  render() {
    const {
      doneThings,
      removeButton,
      fontSize,
      onPressRemove,

      style,
      thingStyle,
      removeButtonStyle
    } = this.props;

    return (
      <View style={style}>
        {(doneThings || []).map((t,i) =>
          <View key={i} style={thingStyle}>
            <Text style={this.getThingNameStyle(t)}>{t}</Text>
            {onPressRemove &&
              <TouchableOpacity style={removeButtonStyle} onPress={() => onPressRemove(t)}>
                <Text style={{fontSize: fontSize - 4}}>⨉</Text>
              </TouchableOpacity>
            }
          </View>
        )}
      </View>
    );
  }
}

export default DoneThings
