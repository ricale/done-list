import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, TextInput, Button, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';

import Container from 'components/Container';
import DoneThings from 'components/DoneThings';
import {addDoneThing, removeDoneThing} from 'actions/days';

class AddDoneThingForm extends Component {
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
    const {name} = this.state;

    if(!!name) {
      this.props.onPressButton(name);
      this.setState({name: ''});
    }
  }

  render() {
    const {inputStyle} = this.props;
    const {name} = this.state;

    return (
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
    )
  }
}

class DayView extends Component {
  handlePressAdd = (thingName) => {
    const {day, dayData: {doneThings}, things, addDoneThing} = this.props;

    const date = day.format('YYYYMMDD');
    const thingDates = (things[thingName] || {}).dates || [];
    addDoneThing(date, thingName, {doneThings, thingDates});
    this.setState({name: ''});
  }

  handlePressRemove = (thingName) => {
    const {day, dayData: {doneThings}, things, removeDoneThing} = this.props;

    const date = day.format('YYYYMMDD');
    const thingDates = (things[thingName] || {}).dates || [];
    removeDoneThing(date, thingName, {doneThings, thingDates});
  }

  render() {
    const {day, dayData: {doneThings}, things, inputStyle} = this.props;

    return (
      <Container>
        <Text style={{width: '100%'}}>{day.format('YYYY-MM-DD')}</Text>

        <AddDoneThingForm
          onPressButton={this.handlePressAdd}
          />

        <DoneThings
          doneThings={doneThings}
          allThings={things}
          onPressRemove={this.handlePressRemove}
          fontSize={20}
          />
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
      dispatch(addDoneThing(...args)),
    removeDoneThing: (...args) =>
      dispatch(removeDoneThing(...args)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DayView);
