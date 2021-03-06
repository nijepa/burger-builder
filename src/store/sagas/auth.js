import { delay } from 'redux-saga/effects';
import { put, call } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions/index'

export function* logoutSaga(action) {
  yield call([localStorage, 'removeItem'], 'token');
  yield call([localStorage, 'removeItem'], 'expirationTime');
  yield call([localStorage, 'removeItem'], 'userId');
  put(actions.logoutSucceed())
} 

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000)
  yield put(actions.logout())
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
    const authData = {
      email: action.email,
      password: action.password,
      returnSecureToken: true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCCqLhjFRQIkbtfR6NIX4TG8zDfPcC8EzE';
    
    if(!action.isSignup) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCCqLhjFRQIkbtfR6NIX4TG8zDfPcC8EzE'
    }
    try {
      const response = yield axios.post(url, authData)

      const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000)
      yield localStorage.setItem('token', response.data.idToken);
      yield localStorage.setItem('expirationTime', expirationDate.toString());
      yield localStorage.setItem('userId', response.data.localId)
      yield put(actions.authSuccess(response.data.idToken, response.data.localId));
      yield put(actions.checkAuthTimeout(response.data.expiresIn));
    } catch (error) {
      yield put(actions.authFail(error.response.data.error));
    }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem('token');
    if (!token) {
      yield put(actions.logout())
    } else {
      const expirationTime = yield new Date(localStorage.getItem('expirationTime'))
      if (expirationTime <= new Date()) {
        yield put(actions.logout())
      } else {
        const userId = yield localStorage.getItem('userId')
        yield put(actions.authSuccess(token, userId));
        yield put(actions.checkAuthTimeout((Number(expirationTime.getTime()) - Number(new Date().getTime))/1000))
      }
    }
}