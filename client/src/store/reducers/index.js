import { combineReducers } from "redux";

import shoppingReducer from './shoppingReducer';

const appReducer = combineReducers({
    shoppingReducer
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;
