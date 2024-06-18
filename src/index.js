import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import {createStore} from 'redux';
import {Provider} from 'react-redux';

const initstate={
  email:null
}

const rootReducer = (state = initstate, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, email: action.payload };
    
    case "LOGOUT":
      return {
        ...state,email:null
      }
    default:
      return state;
  }
}

const store=createStore(rootReducer);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

