import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, TextInput, Button, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';

import Container from 'components/Container';
import DoneThings from 'components/DoneThings';
import {addDoneThing, removeDoneThing} from 'actions/days';
import DateUtil from 'utils/DateUtil';

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
    const {inputStyle, style} = this.props;
    const {name} = this.state;

    return (
      <View style={style}>
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

    return (
      <Container>
        <View style={{flexDirection: 'row', marginTop: 1}}>
          <DoneThings
            doneThings={this.getDoneThings()}
            allThings={things}
            onPressRemove={this.handlePressRemove}
            fontSize={20}
            style={{flex: 1}}
            />

          <AddDoneThingForm
            onPressButton={this.handlePressAdd}
            style={{flex: 2}}
            />
          </View>
      </Container>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const {days, things} = state;
  const date = DateUtil.formatForStore(ownProps.day);
  const day = days[date] || {
    date,
    doneThings: []
  };
  return {
    day,
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
