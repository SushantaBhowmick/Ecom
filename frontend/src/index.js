import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from 'react-redux'
import store from './store';
import {positions,transitions,Provider as AlertProvider} from 'react-alert'
import AlertTemplate  from 'react-alert-template-basic'
import { PersistGate } from 'redux-persist/integration/react'
import  {persistor} from './store';


const options = {
  timeout:5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
   <AlertProvider template={AlertTemplate} {...options}>
   <PersistGate loading={null} persistor={persistor}>  
      <App />
    </PersistGate>
    </AlertProvider>
  </Provider>
);

