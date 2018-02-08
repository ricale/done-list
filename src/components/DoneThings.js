import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {colors as defaultColors} from 'constants/colors';

const s = {
  container: {
    alignItems: 'flex-start',
    marginLeft: 3,
    marginRight: 3
  },
  thing: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    padding: 3,
    marginBottom: 2,
  },
  removeButton: {
    marginLeft: 4,
    paddingLeft: 4,
    paddingRight: 4
  }
}

class DoneThings extends Component {
  static defaultProps = {
    removeButton: false,

    style: {},
    thingStyle: {},
    nameStyle: {},
    removeButtonStyle: {}
  };

  getThingNameStyle(thing) {
    const {allThings, fontSize, nameStyle} = this.props;
    const backgroundColor = defaultColors[thing.id % 10];

    return {
      ...s.name,
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

    const _style             = {...s.container,    ...style};
    const _thingStyle        = {...s.thing,        ...thingStyle};
    const _removeButtonStyle = {...s.removeButton, ...removeButtonStyle};

    return (
      <View style={_style}>
        {(doneThings || []).map((thing,i) =>
          <View key={i} style={_thingStyle}>
            <Text style={this.getThingNameStyle(thing)}>{thing.name}</Text>
            {onPressRemove &&
              <TouchableOpacity style={_removeButtonStyle} onPress={() => onPressRemove(thing)}>
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
