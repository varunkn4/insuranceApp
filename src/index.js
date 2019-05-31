import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import registry from 'app-registry';
import $ from "jquery";

import store from './store';
import App from './App';

import request from './services/request';
import storage from './services/storage';

import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css';
  
registry.register('request', request);
registry.register('storage', storage);


render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('claimProcessing')
);

// $( document ).ready(function() {
//     // var miscContainer = $('.header').height() + $('.statsRow').height() + $('.searRow').height() + 25;
//     var miscContainer = $('.mainArea').height() -  ($('.statsRow').height() + $('.searchRow').height() + $('.agentRow').height());
//     //alert(miscContainer);
//     $('.viewRow').height(miscContainer - 25);
// });