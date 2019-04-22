import { takeLatest } from 'redux-saga/effects'
import ACTION from '../actions/actionTypes'
import * as shoppingSaga from './shoppingSaga'

function* rootSaga() {
    yield takeLatest(ACTION.GET_SHOPLIST_BY_SESSION_ID, shoppingSaga.getShopListBySessionIdSaga);
    yield takeLatest(ACTION.UPDATE_SHOPLIST_BY_SESSION_ID, shoppingSaga.updateShopListBySessionIdSaga);
}

export default rootSaga;
