const log = (state = [], action) => {
  switch (action.type) {
    case 'SET_LOG':
      return action.payload; 
    default:
      return state; 
  }
};

export default log;
