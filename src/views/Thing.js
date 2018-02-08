import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, Button, TextInput, TouchableOpacity} from 'react-native';

import Container from 'components/Container';
import ThingDates from 'components/ThingDates';
import DateUtil from 'utils/DateUtil';
import {updateThing} from 'actions/things';

class UpdateThingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name || ''
    };
  }

  handleChangeName = (name) => {
    this.setState({name})
  }

  handlePress = () => {
    this.props.onPress(this.state.name);
  }

  render() {
    const {name, onPress} = this.state;

    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TextInput
          value={name || ''}
          style={{borderWidth: 1, width: 200}}
          onChangeText={this.handleChangeName}
          />
        <Button
          title='수정'
          onPress={this.handlePress}
          />
      </View>
    );
  }
}

class ThingView extends Component {
  handlePressUpdate = (name) => {
    const {data, updateThing} = this.props;
    updateThing({...data, name});
  }

  render() {
    const {data: {name, dates}} = this.props;

    return (
      <Container>
        <UpdateThingForm
          name={name}
          onPress={this.handlePressUpdate}
          />
          
        <ThingDates
          dates={dates}
          dateStyle={{flexDirection: 'row', alignItems: 'center'}}
          />
      </Container>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const {id} = ownProps;
  const {things} = state;
  return {data: (things[id] || {})}
}

function mapDispatchToProps(dispatch) {
  return {
    updateThing: (...args) =>
      dispatch(updateThing(...args))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThingView);
