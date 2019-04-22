import ACTION from './actionTypes'

export const getShopListById = (id) => {
    return {
        type: ACTION.GET_SHOPLIST_BY_ID,
        id,
    }
};
export const getShopListBySessionId = (sessionId) => {
    return {
        type: ACTION.GET_SHOPLIST_BY_SESSION_ID,
        sessionId,
    }
};
export const createShopList = (shopList) => {
    return {
        type: ACTION.CREATE_SHOPLIST,
        shopList,
    }
};
export const updateShopListById = (id, shopList) => {
    return {
        type: ACTION.UPDATE_SHOPLIST_BY_ID,
        id,
        shopList,
    }
};
export const updateShopListBySessionId = (sessionId, shopList) => {
    return {
        type: ACTION.UPDATE_SHOPLIST_BY_SESSION_ID,
        sessionId,
        shopList,
    }
};
