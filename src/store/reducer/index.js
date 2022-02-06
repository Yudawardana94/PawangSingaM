const defaultState = {
  appsTitle: 'Pawang Singa. benar',
};

const Reducer = (state = defaultState, {type, payload}) => {
  switch (type) {
    case 'SET_NAME':
      return {
        ...state,
        appsTitle: payload,
      };

    default:
      return state;
  }
};

export default Reducer;
