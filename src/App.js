import React from 'react';
import './App.css';
import { Provider } from 'react-redux';

import { LayoutContainer } from 'Components/Layout'
import { BrowserRouter } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router';
import { store, history } from 'Reducer/StoreConfig';

function App() {
  console.disableYellowBox = true;
  
  return (
    <Provider store={store}>
      <div className="App">
        <ConnectedRouter history={history}>
          <LayoutContainer />
        </ConnectedRouter>
      </div>
    </Provider>
  );
}

export default App;
