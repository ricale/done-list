import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import moment from 'moment';

import Container from 'components/Container';
import Calendar from 'components/Calendar';
import {getDays} from 'actions/days';
import {getThings} from 'actions/things';
import Storage from 'utils/Storage';

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
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <TouchableOpacity onPress={() => Storage.clear()} style={{backgroundColor: 'red', padding: 10, margin: 1}}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>clear</Text>
          </TouchableOpacity>
        </View>
        {days && things &&
          <Calendar
            onPressDay={(day) => Actions.day({day})}
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
