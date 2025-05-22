import React from 'react';
import ReactDOM from 'react-dom';
import AssetTabs from './AssetTabs';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AssetTabs />, div);
  ReactDOM.unmountComponentAtNode(div);
});