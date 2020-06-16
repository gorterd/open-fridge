import React from "react";
// import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch, Route, } from "react-router-dom";
import SplashContainer from './splash/splash_container'


// import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_container";
// import './session/session.css';

const App = () => (
  <div>
    {/* <NavBarContainer /> */}
    <Switch>

      <Route exact path="/" component={SplashContainer} />
      {/* <AuthRoute exact path="/" component={SplashContainer} /> */}
      {/* <AuthRoute exact path="/login" component={LoginFormContainer} />*/}
      <Route exact path="/signup" component={SignupFormContainer} /> 
    </Switch>
  </div>
);

export default App;
