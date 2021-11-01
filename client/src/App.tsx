import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/header/Header';
import LandingPage from './pages/LandingPage';




function App() {
  return (
    <>
    <BrowserRouter>
    <Header />
    <Switch>      
      <Route exact path="/" component={LandingPage}></Route>
    </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
