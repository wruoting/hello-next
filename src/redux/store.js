import { composeWithDevTools } from 'redux-devtools-extension';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';

export default function makeStore(initialState = {}) {
    const middleware = process.env.NODE_ENV === 'development'
    ? [reduxImmutableStateInvariant(), thunkMiddleware]
    : [thunkMiddleware];
    const store = createStore(
        reducer,
        initialState,
        composeWithDevTools(applyMiddleware(...middleware)),
    );
    return store;
}