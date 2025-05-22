import React from 'react';
import ReactDOM from 'react-dom';
import OrderHistory from './OrderHistory';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<OrderHistory />, div);
  ReactDOM.unmountComponentAtNode(div);
});