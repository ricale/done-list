import React, {Component} from 'react';
import {View} from 'react-native';

import {colors as defaultColors} from 'constants/colors';
import {IconButton, Text} from 'components';

const s = {
  container: {
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    overflow: 'hidden',
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
    marginRight: 2
  },
  removeButton: {
    marginLeft: 4,
    paddingLeft: 4,
    paddingRight: 4
  }
}

class DoneThings extends Component {
  static defaultProps = {
    style: {},
    thingStyle: {},
    nameStyle: {},
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
      fontSize,
      onPressRemove,

      style,
      thingStyle,
    } = this.props;

    return (
      <View style={[s.container, style]}>

        {(doneThings || []).map((thing,i) =>
          <View key={i} style={[s.thing, thingStyle]}>
            <Text style={this.getThingNameStyle(thing)}>{thing.name}</Text>
            {onPressRemove &&
              <IconButton
                iconName='times'
                onPress={() => onPressRemove(thing)}
                style={{padding: 5}}
                />
            }
          </View>
        )}

      </View>
    );
  }
}

export default DoneThings
