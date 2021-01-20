import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch,
} from "react-router-dom";
import SignIn from "./components/signIn/signInForm.js";
import SignUp from "./components/signUp/signUpForm.js";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/" component={SignIn} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
