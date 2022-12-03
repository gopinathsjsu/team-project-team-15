import { put, call } from 'redux-saga/effects';
import { registerUserService, loginUserService, logoutUserService } from '../services/authenticationService';

import * as types from '../actions'

export function* registerSaga(payload) {
  try {
    console.log("Saga")
    const response = yield call(registerUserService, payload);
    yield put({ type: types.REGISTER_USER_SUCCESS, response });
  } catch(error) {
    yield put({ type: types.REGISTER_USER_ERROR, error });
  }
}

export function* loginSaga(payload) {
  try {
    console.log("Saga")
    const response = yield call(loginUserService, payload);
    console.log(response)
    yield put({ type: types.LOGIN_USER_SUCCESS, response });
  } catch(error) {
    yield put({ type: types.LOGIN_USER_ERROR, error })
  }
}
export function* logoutSaga() {
  try {
    console.log("Saga")
    const response = yield call(logoutUserService);
    console.log(response)
    yield put({ type: types.LOGOUT_USER_SUCCESS, response });
  } catch(error) {
    yield put({ type: types.LOGOUT_USER_ERROR, error })
  }
}