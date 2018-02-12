const initialState = {
};

export default function things(state = initialState, action) {
  switch(action.type) {
    case 'THINGS/FETCH/SUCCESS':
      return {...state, ...action.payload};

    case 'THINGS/REMOVE/SUCCESS':
      const {thingId} = action.payload;
      const result = {...state};
      delete result[thingId];
      return result;

    case 'THINGS/UPDATE/SUCCESS':
    case 'DAYS/ADD_DONE_THING/SUCCESS':
    case 'DAYS/REMOVE_DONE_THING/SUCCESS':
      const {thingData} = action.payload;
      return {...state, [thingData.id]: thingData};

    case 'DAYS/CLEAR/SUCCESS':
      return {};
  }

  return state;
}
