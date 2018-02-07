import React, {Component} from 'react';
import {Router, Stack, Scene, Actions} from 'react-native-router-flux';

import NavBar from 'components/NavBar';

import Calendar from 'views/Calendar';
import Day from 'views/Day';
import Things from 'views/Things';
import Thing from 'views/Thing';
import Setting from 'views/Setting';

const Navigator = () => (
  <Router>
    <Stack key="root" hideNavBar>
      <Stack key="days">
        <Scene
          key="calendar"
          title="Calendar"
          component={Calendar}

          navBar={NavBar}
          left='Things'
          onPressLeft={() => Actions.things()}
          onPressRight={() => Actions.config()}
          />
        <Scene key="day" title="Day" component={Day} onLeft={Actions.pop} />
      </Stack>

      <Stack key="things">
        <Scene
          key="thingList"
          title="Things"
          component={Things}

          navBar={NavBar}
          left='Calendar'
          onPressLeft={() => Actions.pop()}
          onPressRight={() => Actions.config()}
          />
        <Scene key="thing" title="Thing" component={Thing} onLeft={Actions.pop} />
      </Stack>

      <Stack key="config">
        <Scene
          key="settings"
          title="Settings"
          component={Setting}

          navBar={NavBar}
          left='Calendar'
          onPressLeft={() => Actions.pop()}
          />
        <Scene key="thing" title="Thing" component={Thing} onLeft={Actions.pop} />
      </Stack>
    </Stack>
  </Router>
);

export default Navigator;
