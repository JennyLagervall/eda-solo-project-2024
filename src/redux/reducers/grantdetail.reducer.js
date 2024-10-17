const grantDetails = (state = {}, action) => {
  switch (action.type) {
    case 'SET_GRANT_DETAILS':
      return action.payload;
       default:
      return state;
  }
};
export default grantDetails;

//  case 'EDIT_GRANT_DETAILS':
//         return {...state, [action.payload.key]: action.payload.value};
//     case 'RESET': //this will get ready for new state
//         return {};
 