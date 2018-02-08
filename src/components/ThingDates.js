import React, {Component} from 'react';
import {View, Text} from 'react-native';

import DateUtil from 'utils/DateUtil'

export default class ThingDates extends Component {
  getWeekdayColorStyle(d) {
    const color = DateUtil.isSunday(d)   ? 'red' :
                  DateUtil.isSaturday(d) ? 'blue' :
                                           undefined;
    return {color};
  }

  render() {
    const {dates, dateStyle, onPressDelete, ...attrs} = this.props;

    return (
      <View {...attrs}>
        {(dates || []).map((d,i) =>
          <View key={i} >
            <Text style={[dateStyle, this.getWeekdayColorStyle(d)]}>
              {DateUtil.formatForDisplay(d, {weekday: true})}
            </Text>
            {!!onPressDelete &&
              <TouchableOpacity onPress={onPressDelete}>
                <Text>삭제</Text>
              </TouchableOpacity>
            }
          </View>
        )}
      </View>
    );
  }
}
