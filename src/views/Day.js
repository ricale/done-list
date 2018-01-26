import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, TextInput, Button, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';

import Container from 'components/Container';
import DoneThings from 'components/DoneThings';
import {addDoneThing} from 'actions/days';

class AddDoneThingForm extends Component {
  static defaultProps = {
    inputStyle: {
      margin: 1,
      borderWidth: 1,
      borderColor: 'gray'
    }
  };

  render() {
    const {name, inputStyle, onChangeText, onPressButton} = this.props;

    return (
      <View>
        <TextInput
          style={inputStyle}
          value={name}
          onChangeText={onChangeText}
          />
        <Button
          title='Add'
          onPress={onPressButton}
          />
      </View>
    )
  }
}

class DayView extends Component {

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
    const {day, dayData: {doneThings}, things, inputStyle} = this.props;
    const {name} = this.state;

    return (
      <Container>
        <Text style={{width: '100%', textAlign: 'right'}}>DayView: {day.format()}</Text>

        <AddDoneThingForm
          onChangeText={this.handleChangeDoneThingName}
          onPressButton={this.handlePressAdd}
          />

        <DoneThings doneThings={doneThings} allThings={things} />
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
