const log = (state = [], action) => {
  console.log('action', {
    state: state,
    type: action.type,
    payload: action.payload,
  });

  switch (action.type) {
    case 'SET_LOG':
      return action.payload;
    case 'MY_ADD_LOG':
      return [...state, action.payload];
    default:
      return state;
  }
};
export default log;
