import {createActions} from 'redux-actions';
import Storage from 'utils/Storage';

const actions = createActions({
  THINGS: {
    FETCH: {
      SUCCESS: (result) => (result),
      FAILURE: () => ({}),
    },

    UPDATE: {
      SUCCESS: (result) => ({thingData: result}),
      FAILURE: () => ({}),
    },
  }
});

export const getThings = () => {
  return dispatch => {
    return Storage.getByKey('things').then(values => {
      const result = values.reduce((hash, item) => {
        hash[item.id] = item;
        return hash;
      }, {});
      dispatch(actions.things.fetch.success(result));
    })
  }
}

export const updateThing = (thing) => {
  return dispatch => {
    const d = {key: 'things', id: thing.id, data: thing};
    return Storage.set(d).then(() => {
      dispatch(actions.things.update.success(thing));
    });
  }
}

export const removeDates = () => {
  return dispatch => {

  }
}
