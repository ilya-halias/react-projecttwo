import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from "@redux-devtools/extension"

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk )
        // other store enhancers if any
    )
);
