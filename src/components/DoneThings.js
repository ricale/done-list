import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {colors as defaultColors} from 'constants/colors';

class DoneThings extends Component {
  static defaultProps = {
    removeButton: false,

    style: {
      alignItems: 'flex-start',
      marginLeft: 3,
      marginRight: 3
    },
    thingStyle: {
      flexDirection: 'row',
      alignItems: 'center',
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
    // const backgroundColor = (thing || {}).color || defaultColors[Object.keys(allThings).indexOf(thing)];
    const backgroundColor = defaultColors[thing.id % 10];

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
        {(doneThings || []).map((thing,i) =>
          <View key={i} style={thingStyle}>
            <Text style={this.getThingNameStyle(thing)}>{thing.name}</Text>
            {onPressRemove &&
              <TouchableOpacity style={removeButtonStyle} onPress={() => onPressRemove(thing)}>
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
