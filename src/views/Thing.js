import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, Button, TextInput, TouchableOpacity} from 'react-native';

import Container from 'components/Container';
import ThingDates from 'components/ThingDates';
import DateUtil from 'utils/DateUtil';

class ThingView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name || ''
    }
  }

  render() {
    const {name} = this.state;
    const {dates} = this.props;

    return (
      <Container>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput
            value={name || 'asdf'}
            style={{borderWidth: 1, width: 200}}
            onChangeText={(text) => this.setState({name: text})}
            />
          <Button
            title='수정'
            onPress={() => ({})}
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
  return {...things[id]}
}

export default connect(mapStateToProps)(ThingView);
