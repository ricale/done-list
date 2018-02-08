import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import moment from 'moment';

import Container from 'components/Container';
import Calendar from 'components/Calendar';
import {getDays} from 'actions/days';
import {getThings} from 'actions/things';
import Storage from 'utils/Storage';
import DateUtil from 'utils/DateUtil';

class CalendarView extends Component {
  componentWillMount() {
    // FIXME: things 로딩 후 days 로딩
    this.props.getThings().then(() =>
      this.props.getDays(moment().subtract(14, 'days'), moment())
    );
  }

  render() {
    const {days, things} = this.props;
    return (
      <Container>
        {days && things &&
          <Calendar
            onPressDay={(day) => Actions.day({day, title: DateUtil.formatForDisplay(day)})}
            days={days}
            things={things || []} />
        }
      </Container>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    getDays: (...args) =>
      dispatch(getDays(...args)),
    getThings: (...args) =>
      dispatch(getThings(...args))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarView);
