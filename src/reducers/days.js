const initialState = {
};

export default function days(state = initialState, action) {
  switch(action.type) {
    case 'DAYS/FETCH/SUCCESS':
      return {...state, ...action.payload}

    case 'DAYS/ADD_DONE_THING/SUCCESS':
      const {dayData} = action.payload;
      return {...state, [dayData.date]: dayData};
  }

  return state;
}
