import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';

import Container from 'components/Container';
import ThingDates from 'components/ThingDates';
import TextButton from 'components/TextButton';
import Input from 'components/Input';
import Button from 'components/Button';
import DateUtil from 'utils/DateUtil';
import {updateThing, removeThing} from 'actions/things';

class ThingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name || ''
    };
  }

  handleChangeName = (name) => {
    this.setState({name})
  }

  handlePressUpdate = () => {
    this.props.onPressUpdate(this.state.name);
  }

  render() {
    const {style, onPressRemove} = this.props;
    const {name} = this.state;

    return (
      <View style={[{padding: 1}, style]}>
        <Input
          value={name || ''}
          onChangeText={this.handleChangeName}
          style={{marginBottom: 2}}
          />

        <TextButton
          onPress={this.handlePressUpdate}
          text='이름 수정'
          style={{marginBottom: 2}}
          />

        <TextButton
          onPress={onPressRemove}
          disabled={!onPressRemove}
          style={{backgroundColor: 'red'}}
          text='삭제'
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

  handlePressRemove = () => {
    const {removeThing, data} = this.props;
    removeThing(data).then(() => Actions.pop());
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

          <ThingForm
            name={name}
            onPressUpdate={this.handlePressUpdate}
            onPressRemove={(dates || []).length === 0 ? this.handlePressRemove : undefined}
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
      dispatch(updateThing(...args)),
    removeThing: (...args) =>
      dispatch(removeThing(...args))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThingView);
