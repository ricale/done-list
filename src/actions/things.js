import {createActions} from 'redux-actions';

import Thing from 'scheme/Thing';

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

    REMOVE: {
      SUCCESS: (result) => ({thingId: result}),
      FAILURE: () => ({}),
    },
  }
});

export const getThings = () => {
  return dispatch =>
    Thing.get().then(result =>
      dispatch(actions.things.fetch.success(result))
    );
}

export const updateThing = (thing) => {
  return dispatch =>
    Thing.update(thing.id, thing).then(() =>
      dispatch(actions.things.update.success(thing))
    );
}

export const removeThing = (thing) => {
  return dispatch =>
    Thing.remove(thing.id).then(() =>
      dispatch(actions.things.remove.success(thing.id))
    );
}

export const removeDates = () => {
  return dispatch => {

  }
}
