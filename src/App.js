import React, {useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { useAuth0 } from "./middleware/react-auth0-spa";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import history from "./utils/history";

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
          <Route path="/" exact />
          <Route path='/logout' render={() => logout()} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;