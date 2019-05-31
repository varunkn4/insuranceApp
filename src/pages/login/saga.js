import { put } from 'redux-saga/effects';
import registry from 'app-registry';
import { replace as replaceRouter } from 'react-router-redux';

function* verifyAuth(action) {
    const request = registry.get('request');
    const storage = registry.get('storage');
    const uname = action.userCredentials.username;
    const pword = action.userCredentials.password;
    const requestOptions = {
      crossDomain: true,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_name: uname,
        pass_word: pword,
      })
    };
    const response = yield request.postMethod('http://suyatidev.suyatitech.com:8000/api/v1/auth/login/', requestOptions);
    if (response.Tokenkey != null) {
      storage.setItem("token", response.Tokenkey);
      storage.setItem("user-id", response.UserId);
      yield put(replaceRouter(`/main`));
    }
    else {
      yield put({ type: "LOGIN:DO_LOGIN:FAIL", error: 'Incorrect Username and Password ' });
    }
  }
  
  export default verifyAuth;
