import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, TextInput, Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';

import {Container, DoneThings, TextButton, Input} from 'components';
import {addDoneThing, removeDoneThing} from 'actions/days';
import {DateUtil} from 'utils';

class AddDoneThingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.clear) {
      this.setState({name: ''})
    }
  }

  handleChangeDoneThingName = (name) => {
    this.setState({name});
  }

  handlePressAdd = () => {
    const {name} = this.state;

    if(!!name) {
      this.props.onPressButton(name);
    }
  }

  render() {
    const {style} = this.props;
    const {name} = this.state;

    return (
      <View style={style}>
        <Input
          value={name}
          onChangeText={this.handleChangeDoneThingName}
          style={{marginBottom: 2}}
          />

        <TextButton
          onPress={this.handlePressAdd}
          text='추가'
          />
      </View>
    )
  }
}

class DayView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clearForm: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      day,
      error
    } = this.props;
    const {
      day: nextDay,
      error: nextError
    } = nextProps;

    const addedDoneThing = day.doneThings.length < nextDay.doneThings.length;
    this.setState({clearForm: addedDoneThing});

    if(error.timestamp !== nextError.timestamp) {
      Alert.alert(
        nextError.message,
        '',
        [{text: '확인'},],
        {cancelable: false}
      );
    }
  }

  handlePressAdd = (thingName) => {
    const {day, things, addDoneThing} = this.props;

    const thingId = Object.keys(things).filter(id => things[id].name === thingName)[0];
    addDoneThing(day, things[thingId] || {name: thingName});
    this.setState({name: ''});
  }

  handlePressRemove = (thing) => {
    const {day, removeDoneThing} = this.props;

    removeDoneThing(day, thing);
  }

  getDoneThings() {
    const {day, things} = this.props;

    return (day.doneThings || []).map(id => things[id]);
  }

  render() {
    const {day, things, inputStyle} = this.props;
    const {clearForm} = this.state;

    return (
      <Container>
        <View style={{flexDirection: 'row', marginTop: 1}}>
          <DoneThings
            doneThings={this.getDoneThings()}
            allThings={things}
            onPressRemove={this.handlePressRemove}
            fontSize={20}
            style={{flex: 2}}
            />

          <AddDoneThingForm
            onPressButton={this.handlePressAdd}
            style={{flex: 3, padding: 1}}
            clear={clearForm}
            />
          </View>
      </Container>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const {days, things, error} = state;
  const date = DateUtil.formatForStore(ownProps.day);
  const day = days[date] || {
    date,
    doneThings: []
  };

  return {
    day,
    things,
    error
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
