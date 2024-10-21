import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchGrantList() {
  try {
    const response = yield axios.get('/api/grant');
    yield put({ type: 'GET_GRANT_LIST', payload: response.data });
  } catch (error) {
    console.log('List GET saga request failed', error);
  }
}
function* addGrant(action) {
  try {
    console.log('trying to add grant', action.payload);
    yield axios.post(`/api/grant`, action.payload);
    yield put({ type: 'FETCH_GRANT_LIST' });
  } catch (error) {
    console.log('error in add log saga', error);
  }
}
function* updateGrant(action) {
  try {
    console.log('trying to update grant', action.payload.data);
    yield axios.put(`/api/grant/edit/${action.payload.id}`, action.payload.data);
    yield put({ type: 'FETCH_GRANT_LIST' });
  } catch (error) {
    console.log('error in update grant saga', error);
  }
}

function* archiveGrantSaga(action) {
  try {
    console.log('Attempting to archive grant by id:', action.payload);

    yield axios.put(`/api/grant/archive/${action.payload}`);
    yield put({ type: 'FETCH_GRANT_LIST' });
  } catch (error) {
    console.log('Error in archiving grant:', error);
  }
}
//our put payload would look like this: action.payload.id (for the /edit/${action.payload.id}, action.payload.data)

function* grantListSaga() {
  yield takeLatest('FETCH_GRANT_LIST', fetchGrantList);
  yield takeLatest('ADD_GRANT', addGrant);
  yield takeLatest('UPDATE_GRANT', updateGrant);
  yield takeLatest('ARCHIVE_GRANT', archiveGrantSaga);
}

export default grantListSaga;
