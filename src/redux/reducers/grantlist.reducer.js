const grantList = (state = [], action) => {
  switch (action.type) {
    case 'GET_GRANT_LIST':
      return action.payload;
    default:
      return state;
  }
};
export default grantList;