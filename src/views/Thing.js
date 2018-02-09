import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';

import Container from 'components/Container';
import ThingDates from 'components/ThingDates';
import TextButton from 'components/TextButton';
import Input from 'components/Input';
import Button from 'components/Button';
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
    const {style} = this.props;
    const {name} = this.state;

    return (
      <View style={[{padding: 1}, style]}>
        <Input
          value={name || ''}
          onChangeText={this.handleChangeName}
          style={{marginBottom: 2}}
          />

        <TextButton
          onPress={this.handlePress}
          text='이름 수정'
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
        <View style={{flexDirection: 'row', marginTop: 1}}>
          <ThingDates
            dates={dates}
            style={{flex: 2}}
            />

          <UpdateThingForm
            name={name}
            onPress={this.handlePressUpdate}
            style={{flex: 3}}
            />
        </View>
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
