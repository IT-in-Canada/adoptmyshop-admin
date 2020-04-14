import React, {useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { useAuth0 } from "./middleware/react-auth0-spa";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import history from "./utils/history";

import "./App.css";
import Validate from "./components/ValidationPage.js";
import Publish  from "./components/PublishPage.js";
import About    from "./components/About.js";
import LandPage from "./components/LandPage.js";

function App() {
  const { isAuthenticated, user, loginWithRedirect, logout, loading } = useAuth0();

  useEffect(() => {
    const fn = async () => {
      if (loading === false && !isAuthenticated) {
        await loginWithRedirect();
      }
    };
    fn();
  }, [isAuthenticated, loginWithRedirect, loading]);

  if (loading || !isAuthenticated) return <div>Loading...</div>;

  return (
    <div className="App">
      {/* Don't forget to include the history module */}
      <Router history={history}>
        <header>
          <NavBar user={user} />
        </header>
        <Switch>
          <Route path='/logout' render={() => logout()} />
          <Route path="/profile" component={ Profile } />

          <Route path="/validate" render = {(props) => <Validate {...props} user = { user } /> } />
          <Route path="/publish"  render = {(props) => <Publish  {...props} user = { user } /> } />
          <Route path="/about"    user={user} component={ About } />

          <Route component = { LandPage } />
        </Switch>
      </Router>
    </div>
  );
}

export default App;