import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import moment from 'moment';

import Container from 'components/Container';
import Calendar from 'components/Calendar';
import {getDays} from 'actions/days';
import {getThings} from 'actions/things';
// import Storage from 'utils/Storage';

class CalendarView extends Component {
  componentWillMount() {
    this.props.getDays(moment().subtract(14, 'days'), moment());
    this.props.getThings();
    // Storage.clear();
  }

  render() {
    const {days} = this.props;
    return (
      <Container>
        <Calendar
          onPressDay={(day) => Actions.day({day})}
          data={days} />
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
