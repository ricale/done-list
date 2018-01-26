import {createActions} from 'redux-actions';
import Storage from 'utils/Storage';

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
    }

    // CREATE: {
    //   SUCCESS: () => ({}),
    //   FAILURE: () => ({}),
    // },

    // UPDATE: {
    //   SUCCESS: () => ({}),
    //   FAILURE: () => ({}),
    // },

    // DELETE: {
    //   SUCCESS: (result) => ({result}),
    //   FAILURE: () => ({}),
    // }
  }
});

export const getDays = (beginDate, endDate) => {
  return dispatch => {
    const delta = endDate.diff(beginDate, 'days') + 1;

    const keyAndIds = [...(new Array(delta))].map((_,i) => {
      const formatted = beginDate.clone().add(i, 'days').format('YYYYMMDD');
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

export const addDoneThing = (date, thing, {doneThings, thingDates}) => {
  return dispatch => {
    const yearmonth = date.slice(0, 6);
    const day = date.slice(6);
    const dayData = {
      date,
      doneThings: doneThings.concat([thing])
    };
    const thingData = {
      thing,
      dates: thingDates.concat(date)
    };

    Storage.set({
      key:  yearmonth,
      id:   day,
      data: dayData
    });
    Storage.set({
      key:  'things',
      id:   thing,
      data: thingData
    });

    return dispatch(
      actions.days.addDoneThing.success(dayData, thingData)
    );
  }
}

const spliceArray = (array, item) => {
  const result = array.slice(0);
  const itemIndex = result.indexOf(item);
  result.splice(itemIndex, 1);
  return result;
}

export const removeDoneThing = (date, thing, {doneThings, thingDates}) => {
  return dispatch => {
    const yearmonth = date.slice(0, 6);
    const day = date.slice(6);
    const dayData = {
      date,
      doneThings: spliceArray(doneThings, thing)
    };
    const thingData = {
      thing,
      dates: spliceArray(thingDates, date)
    };

    Storage.set({
      key:  yearmonth,
      id:   day,
      data: dayData
    });
    Storage.set({
      key:  'things',
      id:   thing,
      data: thingData
    });

    return dispatch(
      actions.days.removeDoneThing.success(dayData, thingData)
    );
  }
}
