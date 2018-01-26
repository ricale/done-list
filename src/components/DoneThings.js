import React, {Component} from 'react';
import {View, Text} from 'react-native';

import {colors as defaultColors} from 'constants/colors';

class DoneThings extends Component {
  getThingNameStyle(thing) {
    const {allThings} = this.props;
    return {
      backgroundColor: thing.color || defaultColors[Object.keys(allThings).indexOf(thing)],
      padding: 3,
      marginBottom: 1
    };
  }

  render() {
    const {doneThings} = this.props;

    return (
      <View style={{alignItems: 'flex-start'}}>
        {(doneThings || []).map((t,i) =>
          <View key={i}>
            <Text style={this.getThingNameStyle(t)}>{t}</Text>
          </View>
        )}
      </View>
    );
  }
}

export default DoneThings
