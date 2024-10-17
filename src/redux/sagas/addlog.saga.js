import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* addLog(action) {
  try {
    console.log('trying to add log', action.payload);

    yield axios.post(`/api/log`, action.payload);
    yield put({ type: 'SET_LOG' });
  } catch (error) {
    console.log('error in add log saga', error);
  }
}

function* addLogSaga() {
  yield takeLatest('ADD_LOG', addLog);
}

export default addLogSaga;
