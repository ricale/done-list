import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import moment from 'moment';

import DateUtil from 'utils/DateUtil';

const Day = (props) => {
  const {
    style,
    textStyle,
    emptyStyle,
    d,
    onPress,
    doneThings
  } = props;

  if(!d) {
    return (
      <View style={emptyStyle}></View>
    )
  }

  return (
    <TouchableOpacity style={style} onPress={() => onPress(d)}>
      <Text style={textStyle(d)}>{d.format('D')}</Text>
      {(doneThings || []).map((d,i) =>
        <Text key={i}>{d}</Text>
      )}
    </TouchableOpacity>
  )
};

Day.defaultProps = {
  style: {
    width: '25%',
    height: '25%',
    borderWidth: 1,
    padding: 1,

    borderColor: 'white',
    backgroundColor: '#EFEFEF',
  },
  textStyle: (d) => ({
    width: '100%',
    textAlign: 'right',
    color: d.isoWeekday() === 6 ? 'blue' :
      d.isoWeekday() === 7 ? 'red' :
      'black'
  }),
  emptyStyle: {
    width: '25%',
    height: '25%',
    borderWidth: 0
  }
}

export default class Calendar extends Component {
  static defaultProps = {
    lastDate: moment(),
    period: 14,

    style: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      flex: 1,
    },
  };

  getDates() {
    const {lastDate, period} = this.props;
    const dates = DateUtil.getRecentDatesBeginWithMonOrThu(lastDate, 11);
    const result = dates.reduce((result, current) => {
      result.push(current);
      if(current.isoWeekday() === 3) {
        result.push(undefined)
      }
      return result;
    }, []);

    return result;
  }

  render() {
    const {style, onPressDay, data} = this.props;
    return (
      <View style={style}>
        {this.getDates().map((d,i) =>
          <Day
            key={i}
            d={d}
            doneThings={(data[d && d.format('YYYYMMDD')] || {}).doneThings}
            onPress={onPressDay}
            />
        )}
      </View>
    )
  }
}
