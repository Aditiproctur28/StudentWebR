import { all } from 'redux-saga/effects';
import { watchLogin } from './Login/loginSaga';

const rootSaga = function* rootSaga() {
  yield all([
    watchLogin(),
  ]);
};

export default rootSaga;
