import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchLogs() {
  try {
    const response = yield axios.get('/api/log');
    console.log('response', response.data);

    yield put({ type: 'SET_LOG', payload: response.data });
  } catch (error) {
    console.log('Log GET saga request failed', error);
  }
}

function* logSaga() {
  yield takeLatest('FETCH_LOG', fetchLogs);
}

export default logSaga;

//'SET_LOG'
