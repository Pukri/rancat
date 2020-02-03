import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Router from './Router';

const App = (props) => {
  return (
    <BrowserRouter>
      <div>
        <Router />

      </div>
    </BrowserRouter>
  );
};

export default App;
