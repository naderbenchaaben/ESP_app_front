/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"

import reducers, { userReducer } from "./reducers/user-reducer.js"
import App from './App';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
const store = createStore(userReducer, applyMiddleware(thunk))
ReactDOM.render(
  
  <Provider store={store}>
        <App />
    </Provider>
,document.getElementById("root")
);
