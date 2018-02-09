import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import moment from 'moment';

import DoneThings from 'components/DoneThings';
import Icon from 'components/Icon';
import DateUtil from 'utils/DateUtil';

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
    opacity: 0.5
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
      <View style={this.getStyle()}>
        {!!d &&
          <TouchableOpacity style={{flex: 1}} onPress={onPress}>
            <Text style={this.getTextStyle()}>
              {d.format('D')}
            </Text>
            <DoneThings doneThings={doneThings} />
          </TouchableOpacity>
        }
      </View>
    )
  }
};

export default class Calendar extends Component {
  static defaultProps = {
    style: {
      display: 'flex',
      flex: 1,
    },

    controllerStyle: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },

    daysStyle: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      flex: 1,
    },
  };

  constructor(props) {
    super(props);

    const lastDate = props.initialLastDate || moment();
    this.state = {
      lastDate,
      dates: DateUtil.getCurrentWeeks(lastDate)
    };
  }

  componentWillMount() {
    this.loadData();
  }

  handlePressLeft = () => {
    const lastDate = this.state.dates[0].clone().subtract(1, 'days');
    this.setState({
      lastDate,
      dates: DateUtil.getCurrentWeeks(lastDate)
    }, () => this.loadData());
  }

  handlePressRight = () => {
    const {dates} = this.state;
    const lastDate = dates[dates.length - 1].clone().add(14, 'days');
    this.setState({
      lastDate,
      dates: DateUtil.getCurrentWeeks(lastDate)
    }, () => this.loadData());
  }

  loadData() {
    const {onChangePeriod} = this.props;
    const {dates} = this.state;
    onChangePeriod(dates[0], dates[dates.length - 1]);
  }

  canGoNextPage() {
    const {dates} = this.state;
    const nextDate = dates[dates.length - 1].clone().add(1, 'days');
    return DateUtil.isFuture(nextDate);
  }

  getDatesForDisplay() {
    return this.state.dates.reduce((result, current) => {
      result.push(current);
      if(current.isoWeekday() === 3) {
        result.push(undefined)
      }
      return result;
    }, []);
  }

  getDoneThings(days, d) {
    const {things} = this.props;
    const key = d && DateUtil.formatForStore(d);
    const day = days[key] || {};
    const {doneThings} = day;

    return (doneThings || []).map(id => things[id]);
  }

  render() {
    const {
      days,
      things,
      onPressDay,

      style,
      controllerStyle,
      daysStyle,
    } = this.props;

    const {dates} = this.state;

    return (
      <View style={style}>
        <View style={controllerStyle}>
          <TouchableOpacity style={{padding: 10}} onPress={this.handlePressLeft}>
            <Icon name='arrow-left' />
          </TouchableOpacity>
          <Text>{`${DateUtil.formatForDisplay(dates[0])} ~ ${DateUtil.formatForDisplay(dates[dates.length - 1])}`}</Text>
          <TouchableOpacity style={{padding: 10}} onPress={this.handlePressRight} disabled={this.canGoNextPage()}>
            <Icon name='arrow-right' />
          </TouchableOpacity>
        </View>

        <View style={daysStyle}>
          {this.getDatesForDisplay().map((d,i) =>
            <Day
              key={i}
              d={d}
              doneThings={this.getDoneThings(days, d)}
              onPress={onPressDay}
              />
          )}
        </View>
      </View>
    )
  }
}
