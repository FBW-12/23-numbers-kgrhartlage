import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  NUMBERS_API_REQUEST,
  NUMBERS_API_SUCCESS,
  NUMBERS_API_FAILURE,
} from '../actions';

// watch for actions dispatched to the store, start worker saga
export function* watcherSaga() {
  yield takeLatest(NUMBERS_API_REQUEST, workerSaga);
}

function fetchNumbersTrivia(number) {
  return axios.get(
    `https://numbers-api-proxy.kgrhartlage.now.sh/?number=${number}`
  );
}

// make the API call when watcher saga sees the action
function* workerSaga({ number }) {
  try {
    if (!number.length) {
      number = 'random';
    } else if (isNaN(number)) {
      throw new Error('Please enter a number.');
    } else if (!Number.isInteger(Number(number))) {
      throw new Error('The number must be an integer.');
    } else if (number < 0) {
      throw new Error('The number must be positive.');
    }

    const response = yield call(() => fetchNumbersTrivia(number));
    const trivia = response.data;

    // dispatch a success action to the store
    yield put({ type: NUMBERS_API_SUCCESS, trivia });
  } catch (error) {
    // dispatch a failure action to the store
    yield put({ type: NUMBERS_API_FAILURE, error });
  }
}
