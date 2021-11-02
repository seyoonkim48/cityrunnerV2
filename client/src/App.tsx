import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/header/Header';
import Admin from './pages/Admin';
import Community from './pages/Community';
import LandingPage from './pages/LandingPage';
import MatchingPage from './pages/MatchingPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';





function App() {
  return (
    <>
    <BrowserRouter>
    <Header />
    <Switch>      
      <Route exact path="/" component={LandingPage}></Route>
      <Route exact path="/matching" component={MatchingPage}></Route>
      <Route exact path="/community" component={Community}></Route>
      <Route exact path="/admin" component={Admin}></Route>
      <Route exact path="/signin" component={SignIn}></Route>
      <Route exact path="/signup" component={SignUp}></Route>
    </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
