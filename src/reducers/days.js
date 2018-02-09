const initialState = {
};

export default function days(state = initialState, action) {
  switch(action.type) {
    case 'DAYS/FETCH/SUCCESS':
      return {...state, ...action.payload}

    case 'DAYS/ADD_DONE_THING/SUCCESS':
    case 'DAYS/REMOVE_DONE_THING/SUCCESS':
      const {dayData} = action.payload;
      return {...state, [dayData.date]: dayData};

    case 'DAYS/CLEAR/SUCCESS':
      return {};
  }

  return state;
}
