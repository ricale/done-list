import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import moment from 'moment';

import {Container, Calendar} from 'components';
import {getDays} from 'actions/days';
import {getThings} from 'actions/things';
import {Storage, DateUtil} from 'utils';

class CalendarView extends Component {
  constructor(props) {
    super(props);
  }

  handlePressDay = (day) => {
    Actions.day({day, title: DateUtil.formatForDisplay(day)});
  }

  handleChangePeriod = (beginDate, lastDate) => {
    const {getThings, getDays} = this.props;
    getThings().then(() =>
      getDays(beginDate, lastDate)
    );
  }

  render() {
    const {days, things} = this.props;

    return (
      <Container>
        <Calendar
          onPressDay={this.handlePressDay}
          onChangePeriod={this.handleChangePeriod}
          initialLastDate={moment()}
          days={days}
          things={things || []}
          />
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
