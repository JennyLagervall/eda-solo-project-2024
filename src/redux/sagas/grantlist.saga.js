import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchGrantList() {
  try {
    const response = yield axios.get('/api/grant');
    yield put({ type: 'GET_GRANT_LIST', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* grantListSaga() {
  yield takeLatest('FETCH_GRANT_LIST', fetchGrantList);
}

export default grantListSaga;
