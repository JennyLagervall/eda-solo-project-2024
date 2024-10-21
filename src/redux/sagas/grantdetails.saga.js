import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* grabGrantDetails(action) {
  try {
    const response = yield axios.get(`/api/grant/${action.payload}`);
    console.log('grant details', response.data);
    yield put({ type: 'SET_GRANT_DETAILS', payload: response.data });
  } catch (error) {
    console.log('details get request failed', error);
  }
}




function* grantDetailsSaga() {
  yield takeLatest('FETCH_GRANT_DETAILS', grabGrantDetails);
  
}

export default grantDetailsSaga;
