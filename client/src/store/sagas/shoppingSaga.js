import { put } from 'redux-saga/effects'
import ACTION from '../actions/actionTypes'
import { getShopListById, getShopListBySessionId,
    createShopList, updateShopListBySessionId, updateShopListById } from '../../api/rest/shopListService'

export function* getShopListBySessionIdSaga({ sessionId }) {
    console.log('getShopListBySessionIdSaga response from server: ');
    try {
        const { data } = yield getShopListBySessionId(sessionId);
        console.log(data);
        yield put({ type: ACTION.GET_SHOPLIST_BY_SESSION_ID_RESPONSE, shopList: data})
    } catch (e) {
        yield console.log(e);
    }
}
export function* updateShopListBySessionIdSaga({ sessionId, shopList }) {
    try {
        const { data } = yield updateShopListBySessionId(sessionId, shopList);
        console.log('updateShopListBySessionIdSaga response from server: ');
        console.log(data);
        yield put({ type: ACTION.UPDATE_SHOPLIST_BY_SESSION_ID_RESPONSE, shopList: data})
    } catch (e) {
        yield console.log(e);
    }
}
