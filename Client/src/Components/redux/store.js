import { createStore,combineReducers } from 'redux';
import { saveDataReducer } from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const allReducers = combineReducers({
    oneReducers:saveDataReducer
});

export const store = createStore(allReducers, composeWithDevTools());
