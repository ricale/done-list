import React, {Component} from 'react';
import {View} from 'react-native';

import Text from 'components/Text';
import DateUtil from 'utils/DateUtil'

export default class ThingDates extends Component {
  getWeekdayColorStyle(d) {
    const color = DateUtil.isSunday(d)   ? 'red' :
                  DateUtil.isSaturday(d) ? 'blue' :
                                           undefined;
    return {color};
  }

  render() {
    const {dates, onPressDelete, ...attrs} = this.props;

    return (
      <View {...attrs}>
        {(dates || []).map((d,i) =>
          <View key={i} >
            <Text style={[{flexDirection: 'row', alignItems: 'center'}, this.getWeekdayColorStyle(d)]}>
              {DateUtil.formatForDisplay(d, {weekday: true})}
            </Text>
            {!!onPressDelete &&
              <IconButton iconName='trash-alt' onPress={onPressDelete}/>
            }
          </View>
        )}
      </View>
    );
  }
}
