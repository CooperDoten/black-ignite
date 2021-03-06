import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


//Fetches all talks/categories from DB, sends to props
function* fetchTalks() {

  try {
    let response = yield axios.get(`/api/talks`);
    yield put({ type: 'SET_TALKS', payload: response.data});
  } catch (error) {
    console.log('Talks GET request failed', error);
  }
}

//Fetches info on specific talk, sends to props
function* fetchCategory(action) {

try {
  let response = yield axios.get(`/api/talks/${action.payload.talkId}`);

  yield put({ type: 'SET_TALK', payload: response.data});
} catch (error) {
  console.log('Talks GET request failed', error);
}
}


function* talksSaga() {
  yield takeLatest('FETCH_ALL_TALKS', fetchTalks);
  yield takeLatest('FETCH_ONE_CATEGORY', fetchCategory);
}

export default talksSaga;