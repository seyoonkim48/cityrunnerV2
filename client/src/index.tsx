import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyle from './styles/ GlobalStyles'
import { ThemeProvider } from 'styled-components';
import { theme } from './theme/theme';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import promiseMiddlerware from 'redux-promise';
import rootReducer from './redux';
import { applyMiddleware, createStore } from 'redux';


const createStoreWidthMiddleware = applyMiddleware(
  promiseMiddlerware,
  reduxThunk,
)(createStore);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={createStoreWidthMiddleware(rootReducer)}>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
