import React from 'react';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

import Reducer from './src/store';
import Navigation from './src/navigations';

const store = createStore(Reducer, applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
