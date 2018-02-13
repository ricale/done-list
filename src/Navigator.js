import React, {Component} from 'react';
import {Router, Stack, Scene, Actions} from 'react-native-router-flux';

import {IconButton} from 'components';

import Calendar from 'views/Calendar';
import Day from 'views/Day';
import Things from 'views/Things';
import Thing from 'views/Thing';
import Setting from 'views/Setting';

const NavBarButton = ({...args, onPress, iconName}) => (
  <IconButton {...args} color='#017afe' />
);

const Navigator = () => (
  <Router>
    <Stack key="root" hideNavBar>
      <Stack key="days">
        <Scene
          key="calendar"
          title="Calendar"
          component={Calendar}

          renderLeftButton={<NavBarButton onPress={() => Actions.things()} iconName='bars' />}
          renderRightButton={<NavBarButton onPress={() => Actions.config()} iconName='cog' />}
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
