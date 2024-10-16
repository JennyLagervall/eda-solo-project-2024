const grantDetails = (state = [], action) => {
  switch (action.type) {
    case 'GET_GRANT_DETAILS':
      return action.payload;
    default:
      return state;
  }
};
export default grantDetails;
