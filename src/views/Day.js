import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, TextInput, Button, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';

import Container from 'components/Container';

import {addDoneThing} from 'actions/days';

class DayView extends Component {
  static defaultProps = {
    inputStyle: {
      margin: 1,
      borderWidth: 1,
      borderColor: 'gray'
    }
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChangeDoneThingName = (name) => {
    this.setState({name});
  }

  handlePressAdd = () => {
    const {day, dayData: {doneThings}, things, addDoneThing} = this.props;
    const {name} = this.state;

    const thing = name;
    const date = day.format('YYYYMMDD');
    const thingDates = (things[thing] || {}).dates || [];
    addDoneThing(date, thing, {doneThings: doneThings || [], thingDates})
    this.setState({name: ''});
  }

  render() {
    const {day, dayData: {doneThings}, inputStyle} = this.props;
    const {name} = this.state;

    return (
      <Container>
        <Text style={{width: '100%', textAlign: 'right'}}>DayView: {day.format()}</Text>

        <View>
          <TextInput
            style={inputStyle}
            value={name}
            onChangeText={this.handleChangeDoneThingName}
            />
          <Button
            title='Add'
            onPress={this.handlePressAdd}
            />
        </View>

        <View>
          {doneThings.map((t,i) =>
            <Text key={i}>{t}</Text>
          )}
        </View>
      </Container>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const {days, things} = state;
  const key = ownProps.day.format('YYYYMMDD');
  const dayData = days[key] || {doneThings: []};
  return {
    dayData,
    things
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addDoneThing: (...args) =>
      dispatch(addDoneThing(...args))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DayView);
