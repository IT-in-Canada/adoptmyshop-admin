import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { useAuth0 } from "./middleware/react-auth0-spa";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import history from "./utils/history";

import "./App.css";
import Validate from "./components/Validate.js";
import Publish from "./components/Publish.js";
import Info from "./components/Info.js";
import LandPage from "./components/LandPage.js";
import Home from './routes/Home'

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
    <Router history={history}>
      <header>
        <NavBar user={user} />
      </header>
      <Switch>
        <Route path='/logout' render={() => logout()} />
        <Route path="/profile" component={Profile} />

        <Route path="/" component={Home} />
        <Route path="/validate" render={(props) => <Validate {...props} user={user} />} />
        <Route path="/publish" render={(props) => <Publish  {...props} user={user} />} />
        <Route path="/info" user={user} component={Info} />

        <Route component={LandPage} />
      </Switch>
    </Router>
  );
}

export default App;