import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* addLog(action) {
  try {
    console.log('trying to add log', action.payload);

    const response = yield axios.post(`/api/log`, action.payload);

    yield put({ type: 'MY_ADD_LOG', payload: action.payload });
  } catch (error) {
    console.log('error in add log saga', error);
  }
}
// comment 
function* addLogSaga() {
  yield takeLatest('ADD_LOG', addLog);
}

export default addLogSaga;
