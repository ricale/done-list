const initialState = {
};

export default function error(state = initialState, action) {
  if(!!action.type.match(/\/FAILURE/)) {
    return {
      ...state,
      message: action.payload.message,
      timestamp: new Date().getTime()
    };
  }

  return state;
}
