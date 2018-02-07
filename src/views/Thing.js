import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, Button, TextInput, TouchableOpacity} from 'react-native';

import Container from 'components/Container';
import ThingDates from 'components/ThingDates';
import DateUtil from 'utils/DateUtil';
import {updateThing} from 'actions/things';

class ThingView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.data.name || ''
    };
  }

  handlePressUpdate = () => {
    const {name} = this.state;
    const {data, updateThing} = this.props;

    updateThing({...data, name});
  }

  render() {
    const {name} = this.state;
    const {data: {dates}} = this.props;

    return (
      <Container>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput
            value={name || ''}
            style={{borderWidth: 1, width: 200}}
            onChangeText={(text) => this.setState({name: text})}
            />
          <Button
            title='수정'
            onPress={this.handlePressUpdate}
            />
        </View>
          
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
