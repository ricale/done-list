import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';

class ThingsView extends Component {
  render() {
    const {things} = this.props;
    return (
      <View>
        {Object.keys(things).map((k,i) => 
          <View key={i} style={{marginBottom: 10}}>
            <Text>{things[k].thing}</Text>
            <View style={{marginLeft: 10}}>
              {things[k].dates.map((d,j) =>
                <Text key={j}>{d}</Text>
              )}
            </View>
          </View>
        )}
      </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {things: state.things || {}};
}

export default connect(mapStateToProps)(ThingsView);
