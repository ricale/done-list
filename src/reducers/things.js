const initialState = {
};

export default function things(state = initialState, action) {
  switch(action.type) {
    case 'THINGS/FETCH/SUCCESS':
      return {...state, ...action.payload};

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
