import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, TextInput} from 'react-native';
import {Actions} from 'react-native-router-flux';

import Container from 'components/Container';
import DoneThings from 'components/DoneThings';
import TextButton from 'components/TextButton';
import Input from 'components/Input';
import {addDoneThing, removeDoneThing} from 'actions/days';
import DateUtil from 'utils/DateUtil';

class AddDoneThingForm extends Component {
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
            style={{flex: 2}}
            />

          <AddDoneThingForm
            onPressButton={this.handlePressAdd}
            style={{flex: 3, padding: 1}}
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
