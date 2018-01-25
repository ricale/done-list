import React, {Component} from 'react';
import {Router, Stack, Scene, Actions} from 'react-native-router-flux';

import Calendar from 'views/Calendar';
import Day from 'views/Day';

const Navigator = () => (
  <Router>
    <Stack key="root">
      <Scene key="calendar" component={Calendar} title="Calendar"/>
      <Scene key="day" component={Day} onLeft={Actions.pop} title="Day"/>
    </Stack>
  </Router>
);

export default Navigator;
