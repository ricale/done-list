import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import moment from 'moment';

import DateUtil from 'utils/DateUtil';
import DoneThings from 'components/DoneThings';

const dayStyle = {
  base: {
    width: '25%',
    height: '25%',
  },
  empty: {},
  existed: {
    borderWidth: 1,
    padding: 1,
    borderColor: 'white',
    backgroundColor: '#EFEFEF',
  },
  enabled: {},
  disabled: {
    opacity: 0.3
  }
};

const dayTextStyle = {
  base: {
    width: '100%',
    textAlign: 'right',
  },
  workday:  { color: 'black'},
  sat:      { color: 'blue'},
  sun:      { color: 'red'},
  disabled: { color: 'gray'}
};

class Day extends Component {
  handlePress = () => {
    const {onPress, d} = this.props;
    onPress(d);
  }

  isValid() {
    const {d} = this.props;
    return !!d && !DateUtil.isFuture(d)
  }

  getStyle() {
    const {d} = this.props;
    const {base, empty, existed, enabled, disabled} = dayStyle;

    return {
      ...base,
      ...(
        !d                   ? ({...empty}) :
        DateUtil.isFuture(d) ? ({...existed, ...disabled}) :
                               ({...existed, ...enabled})
      )
    };
  }

  getTextStyle() {
    const {d} = this.props;
    const {base, workday, sat, sun, disabled} = dayTextStyle;

    return {
      ...base,
      ...(
        DateUtil.isSunday(d)   ? ({...sun}) :
        DateUtil.isSaturday(d) ? ({...sat}) :
                                 ({...workday})
      )
    }
  }

  render() {
    const {
      d,
      doneThings,
      things
    } = this.props;

    const onPress = this.isValid() ? this.handlePress : undefined;

    return (
      <TouchableOpacity style={this.getStyle()} onPress={onPress}>
        {!!d &&
          <View>
            <Text style={this.getTextStyle()}>
              {d.format('D')}
            </Text>
            <DoneThings doneThings={doneThings} />
          </View>
        }
      </TouchableOpacity>
    )
  }
};

export default class Calendar extends Component {
  static defaultProps = {
    lastDate: moment(),
    period: 14,

    style: {
      display: 'flex',
      flex: 1,
    },

    controllerStyle: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },

    daysStyle: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      flex: 1,
    },
  };

  getDates() {
    const {lastDate, period} = this.props;
    const dates = DateUtil.getCurrentWeeks(lastDate);
    const result = dates.reduce((result, current) => {
      result.push(current);
      if(current.isoWeekday() === 3) {
        result.push(undefined)
      }
      return result;
    }, []);

    return result;
  }

  getDoneThings(days, d) {
    const {things} = this.props;
    const key = d && DateUtil.formatForStore(d);
    const day = days[key] || {};
    const {doneThings} = day;

    return (doneThings || []).map(id => things[id]);
  }

  render() {
    const {style, daysStyle, controllerStyle, onPressDay, days, things} = this.props;

    const dates = this.getDates();

    return (
      <View style={style}>
        <View style={controllerStyle}>
          <TouchableOpacity>
            <Text>⬅</Text>
          </TouchableOpacity>
          <Text>{`${DateUtil.formatForDisplay(dates[0])} ~ ${DateUtil.formatForDisplay(dates[dates.length - 1])}`}</Text>
          <TouchableOpacity>
            <Text>➡</Text>
          </TouchableOpacity>
        </View>

        <View style={daysStyle}>
          {dates.map((d,i) =>
            <Day
              key={i}
              d={d}
              // doneThings={this.getDoneThings(days, d)}
              onPress={onPressDay}
              />
          )}
        </View>
      </View>
    )
  }
}
