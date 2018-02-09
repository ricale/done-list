import {createActions} from 'redux-actions';
import Storage from 'utils/Storage';
import DateUtil from 'utils/DateUtil';
import Scheme from 'scheme';

const actions = createActions({
  DAYS: {
    FETCH: {
      SUCCESS: (result) => (result),
      FAILURE: () => ({}),
    },

    ADD_DONE_THING: {
      SUCCESS: (dayData, thingData) => ({dayData, thingData}),
      FAILURE: () => ({}),
    },

    REMOVE_DONE_THING: {
      SUCCESS: (dayData, thingData) => ({dayData, thingData}),
      FAILURE: () => ({}),
    },

    CLEAR: {
      SUCCESS: () => ({}),
    }
  }
});

export const getDays = (beginDate, endDate) => {
  return dispatch => {
    const delta = endDate.diff(beginDate, 'days') + 1;

    const keyAndIds = [...(new Array(delta))].map((_,i) => {
      const formatted = DateUtil.formatForStore(beginDate.clone().add(i, 'days'));
      const key = formatted.slice(0, 6);
      const id = formatted.slice(6);
      return {key, id};
    });

    return Promise.all(
      keyAndIds.map(({key, id}) =>
        Storage.get(key, id).catch(e =>
          ({date: `${key}${id}`, doneThings: []})
        )
      )
    ).then(values => {
      const result = values.reduce((hash, item) => {
        hash[item.date] = item;
        return hash;
      }, {});

      dispatch(actions.days.fetch.success(result));
    });
  }
}

const getIdForNewThing = () => {
  return Storage.getByKey('things').then(result =>
    result.length === 0 ?
      0 :
      (Math.max(
        ...result.map(r => r.id)
      ) + 1)
  )
};

const saveThing = (thing, date) => {
  const dates = (thing.dates || []).concat(date).sort((a,b) => a - b);
  const thingData = Scheme.Thing(thing.id, thing.name, dates);
  Storage.set({
    key:  'things',
    id:   thing.name,
    data: thingData
  });
  return thingData;
};

const saveDay = (day, thingId) => {
  const yearmonth = day.date.slice(0, 6);
  const dayOfMonth = day.date.slice(6);
  const dayData = Scheme.Day(day.date, day.doneThings.concat([thingId]).sort((a,b) => a - b));
  Storage.set({
    key:  yearmonth,
    id:   dayOfMonth,
    data: dayData
  });
  return dayData;
};

export const addDoneThing = (day, thing) => {
  return dispatch => {
    if(thing.id === undefined) {
      return getIdForNewThing().then(id => {
        const thingData = saveThing({...thing, id}, day.date);
        const dayData = saveDay(day, thingData.id);
        return dispatch(
          actions.days.addDoneThing.success(dayData, thingData)
        )
      });

    } else {
      const thingData = saveThing(thing, day.date);
      const dayData = saveDay(day, thingData.id);
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
    const yearmonth = day.date.slice(0, 6);
    const dayOfMonth = day.date.slice(6);
    const dayData = Scheme.Day(day.date, spliceArray(day.doneThings, thing.id));
    Storage.set({
      key:  yearmonth,
      id:   dayOfMonth,
      data: dayData
    });

    const thingData = Scheme.Thing(thing.id, thing.name, spliceArray(thing.dates, day.date));
    Storage.set({
      key:  'things',
      id:   thing.id,
      data: thingData
    });

    return dispatch(
      actions.days.removeDoneThing.success(dayData, thingData)
    );
  }
}

export const clearAll = () => {
  return dispatch => {
    Storage.clear();
    dispatch(actions.days.clear.success());
  }
}
