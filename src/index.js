import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import App from './App.js';

render(<App />, document.querySelector('#root'), () =>
  console.log('react has rendered')
);
