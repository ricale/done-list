import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import {Router, Stack, Scene, Actions} from 'react-native-router-flux';

import Icon from 'components/Icon';

import Calendar from 'views/Calendar';
import Day from 'views/Day';
import Things from 'views/Things';
import Thing from 'views/Thing';
import Setting from 'views/Setting';

const Button = ({onPress, iconName}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{padding: 10}}>
    <Icon name={iconName} color='#017afe' />
  </TouchableOpacity>
);

const Navigator = () => (
  <Router>
    <Stack key="root" hideNavBar>
      <Stack key="days">
        <Scene
          key="calendar"
          title="Calendar"
          component={Calendar}

          renderLeftButton={<Button onPress={() => Actions.things()} iconName='bars' />}
          renderRightButton={<Button onPress={() => Actions.config()} iconName='cog' />}
          />
        <Scene
          key="day"
          title='day'
          component={Day}
          back
          />
      </Stack>

      <Stack key="things" back>
        <Scene
          key="thingList"
          title="Things"
          component={Things}
          />
        <Scene
          key="thing"
          title="Thing"
          component={Thing}
          />
      </Stack>

      <Stack key="config" back>
        <Scene
          key="settings"
          title="Settings"
          component={Setting}
          />
      </Stack>
    </Stack>
  </Router>
);

export default Navigator;
