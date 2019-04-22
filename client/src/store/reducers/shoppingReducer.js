import ACTION from '../actions/actionTypes';

const initialState = {
    shopList: {},
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION.UPDATE_SHOPLIST_BY_SESSION_ID_RESPONSE: {
            return {
                ...state,
                shopList: action.shopList
            }
        }
        case ACTION.GET_SHOPLIST_BY_SESSION_ID_RESPONSE: {
            return {
                ...state,
                shopList: action.shopList
            }
        }
        default: { return state }
    }
}
