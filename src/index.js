import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import WapApp from './wap/App'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'
import { userAgent } from './utils/tools';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter basename="/">
    <Suspense>
      <WapApp/>
    </Suspense>
  </BrowserRouter>
);
reportWebVitals();