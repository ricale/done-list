import {createActions} from 'redux-actions';

import {DateUtil} from 'utils';
import Scheme from 'scheme';
import Day from 'scheme/Day';
import Thing from 'scheme/Thing';

const actions = createActions({
  DAYS: {
    FETCH: {
      SUCCESS: (result) => (result),
      FAILURE: (message) => ({message}),
    },

    ADD_DONE_THING: {
      SUCCESS: (dayData, thingData) => ({dayData, thingData}),
      FAILURE: (message) => ({message}),
    },

    REMOVE_DONE_THING: {
      SUCCESS: (dayData, thingData) => ({dayData, thingData}),
      FAILURE: (message) => ({message}),
    },

    CLEAR: {
      SUCCESS: () => ({}),
    }
  }
});

export const getDays = (beginDate, endDate) => {
  return dispatch => {
    return Day.get(beginDate, endDate).then(values =>
      dispatch(
        actions.days.fetch.success(
          values.reduce((hash, item) => Object.assign(hash, {[item.date]: item}), {})
        )
      )
    );
  };
}

export const addDoneThing = (day, thing) => {
  return dispatch => {
    if(thing.id === undefined) {
      return Thing.add(thing.name, day.date).then(thingData => {
        const dayData = Day.addDoneThing(day, thingData.id);
        return dispatch(
          actions.days.addDoneThing.success(dayData, thingData)
        )
      }).catch(message =>
        dispatch(actions.days.addDoneThing.failure(message))
      );

    } else {
      const thingData = Thing.addDate(thing, day.date);
      const dayData = Day.addDoneThing(day, thingData.id);
      return dispatch(
        actions.days.addDoneThing.success(dayData, thingData)
      )
    }
  }
}

const spliceArray = (array, item) => {
  const result = array.slice(0);
  const itemIndex = result.indexOf(item);
  result.splice(itemIndex, 1);
  return result;
};

export const removeDoneThing = (day, thing) => {
  return dispatch => {
    const dayData = Day.removeDone(day, thing.id);

    const thingData = Thing.removeDate(thing, day.date);

    return dispatch(
      actions.days.removeDoneThing.success(dayData, thingData)
    );
  }
}

export const clearAll = () => {
  return dispatch => {
    Day.removeAll();
    dispatch(actions.days.clear.success());
  }
}
