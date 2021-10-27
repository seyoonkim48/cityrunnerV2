import { BrowserRouter as Router, Switch, Route, BrowserRouter } from "react-router-dom";
import Admin from './pages/Admin';
import Community from './pages/Community';
import LandingPage from './pages/LandingPage';
import MatchingPage from './pages/MatchingPage';
import Mycrew from './pages/Mycrew';
import Mypage from './pages/Mypage';


function App() {
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={LandingPage}></Route>
			<Route exact path="/matching" component={MatchingPage}></Route>
      <Route exact path="/mypage" component={Mypage}></Route>
			<Route exact path="/mycrew" component={Mycrew}></Route>
			<Route exact path="/community" component={Community}></Route>
      <Route exact path="/admin" component={Admin}></Route>
		</Switch>
	</BrowserRouter>
}

export default App;
