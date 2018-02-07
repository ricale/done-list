import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';

import Container from 'components/Container';
import ThingDates from 'components/ThingDates';
import {colors as defaultColors} from 'constants/colors';
import DateUtil from 'utils/DateUtil';

const Thing = (props) => {
  const {
    id,
    name,
    dates,
    style,
    nameStyle,
    datesStyle,
    dateStyle
  } = props;

  return (
    <TouchableOpacity style={style} onPress={() => Actions.thing({id})}>
      <Text style={[nameStyle, {backgroundColor: defaultColors[id % defaultColors.length]}]}>
        {name}
      </Text>
      <ThingDates
        dates={dates}
        style={datesStyle}
        dateStyle={dateStyle}
        />
    </TouchableOpacity>
  );
};

Thing.defaultProps = {
  style: {
    alignItems: 'flex-start',
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
