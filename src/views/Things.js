import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';

import {Container, ThingDates, Text} from 'components';
import {colors as defaultColors} from 'constants/colors';
import {DateUtil} from 'utils';

const s = {
  table: {
    margin: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  col: {
  }
};

const CountTable = (props) => {
  const {
    dates
  } = props;

  const counts = dates.reduce((hash, date) => {
    const diff = DateUtil.diffFromToday(date) * -1;
    (diff <  7) && (hash['1w']  += 1);
    (diff < 28) && (hash['4w']  += 1);
    (diff < 84) && (hash['12w'] += 1);
    return hash;
  }, {'1w': 0, '4w': 0, '12w': 0});

  const weeks = (DateUtil.diffFromToday(dates[0]) * -1) / 7;
  const average = parseInt(dates.length / weeks * 10, 10) / 10;
  const has4Weeks = !!(counts['4w'] - counts['1w']);
  const has12Weeks = !!(counts['12w'] - counts['4w']);

  return (
    <View style={s.table}>
      <View style={s.row}>
        <Text style={s.col}>{`총`}</Text><Text style={s.col}>{`${dates.length}회`}</Text>
      </View>
      <View style={s.row}>
        <Text style={s.col}>{`최근 1주`}</Text><Text style={s.col}>{`${counts['1w']}회`}</Text>
      </View>
      {has4Weeks &&
        <View style={s.row}>
          <Text style={s.col}>{`최근 4주`}</Text><Text style={s.col}>{`${counts['4w']}회`}</Text>
        </View>
      }
      {has12Weeks &&
        <View style={s.row}>
          <Text style={s.col}>{`최근 12주`}</Text><Text style={s.col}>{`${counts['12w']}회`}</Text>
        </View>
      }
      {has4Weeks &&
        <View style={s.row}>
          <Text style={s.col}>{`1주 평균`}</Text><Text style={s.col}>{`${average}회`}</Text>
        </View>
      }
    </View>
  )
}

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

      <CountTable dates={dates} />

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
    fontSize: 18,
    padding: 3
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
