import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';

import Container from 'components/Container';

const Thing = (props) => {
  const {
    thing,
    dates,
    style,
    nameStyle,
    datesStyle,
    dateStyle
  } = props;

  return (
    <View style={style}>
      <Text style={nameStyle}>{thing}</Text>
      <View style={datesStyle}>
        {dates.map((d,j) =>
          <Text key={j} style={dateStyle}>{d}</Text>
        )}
      </View>
    </View>
  );
};

Thing.defaultProps = {
  style: {
    width: '50%',
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#EFEFEF',
  },
  nameStyle: {
    fontSize: 18
  },
  datesStyle: {
    marginLeft: 10
  },
  dateStyle: {
    color: '#666'
  }
};

class ThingsView extends Component {
  render() {
    const {things} = this.props;
    return (
      <Container>
        <View style={{flexDirection: 'row', flexWrap: 'wrap', width: '100%'}}>
          {Object.keys(things).map((k,i) =>
            <Thing key={i} {...things[k]} />
          )}
        </View>
      </Container>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {things: state.things || {}};
}

export default connect(mapStateToProps)(ThingsView);
